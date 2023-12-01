const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');
const User = require("../models/User");
const obtenerPeriodoDelDiaConHora = require("../utils/helpers");
const Noticia = require("../models/Noticia");
const ArchivoNoticia = require("../models/ArchivoNoticia");
const archiver = require('archiver');

const agregarNoticia = async (req, res) => {
    const { fecha, files, titulo } = req.body;

    const userReq = req.user;

    const folderPath = `C:\\Users\\pedro\\Desktop\\COMM\\SysGesCOM-back\\archivosNoticia\\${userReq.nombreUsuario}`;

    fs.readdir(folderPath, async (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta:', err);
            res.status(500).json({ message: 'Error al leer la carpeta' });
        } else {

            try {

                const newNoticia = new Noticia({
                    titulo,
                    fecha,
                    usuario: userReq._id
                });

                const noticiaNueva = await newNoticia.save();

                for (let index = 0; index < req.files.length; index++) {
                    const filePath = path.join(folderPath, req.files[index].filename); // Ruta completa al archivo
                 
                    const newArchivoNoticia = new ArchivoNoticia({
                        rutaArchivo: filePath,
                        noticia: noticiaNueva._id
                    })
                    await newArchivoNoticia.save();
                }

                res.status(200).json({ message: "Se agregó una nueva noticia con éxito" });

            } catch (error) {
            
                if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
                    res.status(400).json({ message: "Hubo un error, intente nuevamente" });
                } else {
                    res.status(error.code || 500).json({ message: 'Error al crear noticia' });
                }
            }
        }
    });
};

const obtenerArchivosDeUnaNoticia = async (req,res)=>{
    try {
        const archivosNoticia = await ArchivoNoticia.find({noticia:req.params.id}).populate("noticia");
       
            if(archivosNoticia.length>1){
               
                const zip = archiver('zip');
                
                res.attachment('archivosNoticia.zip');
                zip.pipe(res);
                
                archivosNoticia.forEach((archivo) => {
                   
                    const partesRuta = archivo.rutaArchivo.split('\\');
                    const nombreArchivo = partesRuta[partesRuta.length - 1];
                  zip.append(fs.createReadStream(archivo.rutaArchivo), { name: nombreArchivo });
                });
                
                zip.finalize();
          
            }else{

                if (fs.existsSync(archivosNoticia[0].rutaArchivo)) {
                    res.sendFile(archivosNoticia[0].rutaArchivo);
                  } else {
                    throw new CustomError("Archivo no encontrado", 404);
                  }
            }
        

    } catch (error) {
        res
        .status(error.code || 500)
        .json({ message: error.message || "Algo explotó :|" });
    }
}

const obtenerNoticias = async (req,res) =>{
    try {
        const noticias = await Noticia.find({estado:true}).populate("usuario");
        res.status(200).json({ noticias });
        
    } catch (error) {
        res
        .status(error.code || 500)
        .json({ message: error.message || "Algo explotó :|" });
    }
}

const borrarNoticias = async (req,res) =>{
    try {
        const { id } = req.body;
        const noticiaRemove = {
          estado:false
        }
        const noticiaEliminada = await Noticia.findByIdAndUpdate(id,noticiaRemove,{new:true})
        if(!noticiaEliminada) throw new CustomError("Noticia no encontrada",404)
        res.status(200).json({message:"Noticia eliminada con éxito"})
    } catch (error) {
        res
        .status(error.code || 500)
        .json({ message: error.message || "Algo explotó :/" });
    }
}

module.exports = {
    agregarNoticia,
    obtenerArchivosDeUnaNoticia,
    obtenerNoticias,
    borrarNoticias
  }