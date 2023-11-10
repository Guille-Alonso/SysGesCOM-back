const RelevamientoMotos = require("../models/RelevamientoMotos");
const Reporte = require("../models/Reporte");
const CustomError = require("../utils/customError");

const agregarRelevamientoMotos = async (req, res) => {
    try {
       
        const { arrayMotos,reporte } = req.body;

        const ultimoReporte = await Reporte.find().sort({ _id: -1 }).limit(1);
        const newReporte = new Reporte({
            numero: ultimoReporte.length > 0 ? ultimoReporte[0].numero + 1 : 1,
            fecha: reporte.fecha,
            categoria: reporte.categoria,
            detalle: reporte.detalle,
            naturaleza:  reporte.naturaleza,
            usuario:  reporte.usuario,
            subcategoria: reporte.subcategoria == "" ? null : reporte.subcategoria,
            dispositivo: reporte.dispositivo,
            rutaImagen: ""
          });
      
         const reporteSaved = await newReporte.save();
         
         for (let index = 0; index < arrayMotos.length; index++) {
             let newRelevamientoMotos = new RelevamientoMotos({
                 personas: arrayMotos[index].personas,
                 cascos: arrayMotos[index].cascos,
                 luces: arrayMotos[index].luces,
                 reporte: reporteSaved._id
             });
             await newRelevamientoMotos.save();
           
         }
        res.status(201).json({ message: "Se agregó un nuevo reporte de relevamiento" });
    } catch (error) {
        res.status(error.code || 500)
            .json({
                message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
            });
    }
};


const getRelevamientoMotos = async (req, res) => {
    try {
        if (req.params.solicitante) {
            const motos = await RelevamientoMotos.findOne();
            if (!motos) throw new CustomError("Relevamiento de motos no encontrados", 404);
            res.status(200).json({ motos });
        } else {
            const motos = await RelevamientoMotos.find().populate({
                path: 'reporte',
                populate: [
                    {
                        path: 'dispositivo',
                        model: 'Dispositivo'
                    },
                    {
                        path: 'subcategoria',
                        model: 'Subcategoria'
                    }
                ]
            })
            
            res.status(200).json({ motos });
        }
    } catch (error) {
        res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
    }
};

module.exports = {
    agregarRelevamientoMotos,
    getRelevamientoMotos,
}