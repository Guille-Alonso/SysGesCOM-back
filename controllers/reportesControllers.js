const Reporte = require("../models/Reporte");
const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');

const agregarReporte= async (req, res) => {
  try {
    const { fecha,detalle,naturaleza,usuario,userName,subcategoria,dispositivo,categoria,photo} = req.body;

    const folderPath =`C:\\Users\\guill\\Desktop\\COM\\SysGesCOM-back\\uploads\\${userName}`;
    let filePath="";

    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Error al leer la carpeta:', err);
      }else{
        const lastFile = files[files.length - 1];
        filePath = path.join(folderPath, lastFile);
      }
 
    const newReporte = new Reporte({
      fecha,
      categoria,
      detalle,
      naturaleza,
      usuario,
      subcategoria: subcategoria == ""? null : subcategoria,
      dispositivo,
      rutaImagen:photo==undefined? filePath : ""
    });

    await newReporte.save();
  });

    res.status(201).json({ message: "Se agregó un nuevo reporte con éxito" });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

const getReportes = async (req, res) => {
  try {
    if (req.params.id) {
      const reporte = await Reporte.findById(req.params.id );
      if (!reporte) throw new CustomError("Reporte no encontrado", 404);
   
      if (fs.existsSync(reporte.rutaImagen)) {
        res.sendFile(reporte.rutaImagen);
      } else {
        throw new CustomError("Imágen no encontrada", 404);
      }

    } else {
      if (req.user.tipoDeUsuario == "visualizador") {
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        const fechaSiguiente = new Date(fechaActual);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

        const reportes = await Reporte.find({
          estado: true,
          usuario: req.user._id,
          createdAt: {
            $gte: fechaActual,
            $lt: fechaSiguiente,
          },
        })
          .populate("naturaleza")
          .populate("categoria")
          .populate("subcategoria")
          .populate("usuario")
          .populate("dispositivo");
        res.status(200).json({ reportes });
      } else if (req.user.tipoDeUsuario == "supervisor") {
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        const fechaAnterior = new Date(fechaActual);
        fechaAnterior.setDate(fechaAnterior.getDate() - 1);
        const fechaSiguiente = new Date(fechaActual);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
      
        const reportes = await Reporte.find({
          estado: true,
          createdAt: {
            $gte: fechaAnterior,
            $lt: fechaSiguiente,
          },
        })
          .populate("naturaleza")
          .populate("categoria")
          .populate("subcategoria")
          .populate("usuario")
          .populate("dispositivo");
        res.status(200).json({ reportes });
      } else {
        const reportes = await Reporte.find({ estado: true })
          .populate("naturaleza")
          .populate("categoria")
          .populate("subcategoria")
          .populate("usuario")
          .populate("dispositivo");
        res.status(200).json({ reportes });
      }
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const actualizarReporte = async (req, res) => {
console.log(req.params);
console.log(req.body);
  try {
    const { id } = req.params;
    // const updatedReporte = req.body;

  //logica de la imagen a reemplazar
  const folderPath = `C:\\Users\\guill\\Desktop\\COM\\SysGesCOM-back\\uploads\\${req.body.userName}`;
  let filePath="";

  if(req.body.rutaImagen !== "" && req.body.photo == undefined){
    fs.unlink(req.body.rutaImagen, (err) => {
      if (err) {
        console.error('Error al borrar el archivo:', err);
        return;
      }
      console.log('Archivo borrado correctamente.');
    });
  }
 

  fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta:', err);
    }else{
      const lastFile = files[files.length - 1];
      filePath = path.join(folderPath, lastFile);
    }
 
  const reporteUpd = {
    categoria: req.body.categoria,
    detalle: req.body.detalle,
    naturaleza: req.body.naturaleza,
    subcategoria: req.body.subcategoria == "null"? null : req.body.subcategoria,
    dispositivo: req.body.dispositivo,
    rutaImagen: req.body.photo == undefined? filePath : req.body.rutaImagen
  }
    const reporte = await Reporte.findByIdAndUpdate(id, reporteUpd, { new: true, runValidators: true });
    if (!reporte) throw new CustomError("Reporte no encontrado", 404)
    res.status(200).json({ message: "Reporte modificado con exito", reporte });
  });
  } catch (error) {
    res.status(error.code || 500)
    .json({
      message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const borrarReporte = async (req,res)=>{
  try {
    const { id } = req.body;
    const reporteRemove = {
      estado:false
    }
    const reporteEliminado = await Reporte.findByIdAndUpdate(id,reporteRemove,{new:true})
    if(!reporteEliminado) throw new CustomError("Reporte no encontrado",404)
    res.status(200).json({message:"Reporte eliminado con éxito"})
  } catch (error) {
    res
    .status(error.code || 500)
    .json({ message: error.message || "algo explotó :|" });
  }
}

module.exports = {
    agregarReporte,
    getReportes,
    actualizarReporte,
    borrarReporte
  }
  