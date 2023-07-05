const { default: mongoose } = require("mongoose");
const Despacho = require("../models/Despacho");
const CustomError = require("../utils/customError");
const Reporte = require("../models/Reporte");

const agregarDespacho= async (req, res) => {
    try {
      const { fecha,acuse,reparticiones,reporteId,usuario} = req.body;
  
      const newDespacho = new Despacho({
        fecha,
        usuario,
        acuse,
        reparticiones:reparticiones.map((id) => new mongoose.Types.ObjectId(id))
      });
  
      const nuevoDespacho = await newDespacho.save();
      const reporteUpd = {despacho: nuevoDespacho._id}
      await Reporte.findByIdAndUpdate(reporteId, reporteUpd);
  
      res.status(201).json({ message: "Se agregó un nuevo despacho con éxito" });
    } catch (error) {
      res.status(error.code || 500)
        .json({
          message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
        });
    }
  };
  
  const getDespachos = async (req, res) => {
    try {
      if (req.params.id) {
        const despacho = await Despacho.findById(req.params.id).populate("reparticiones");
        if (!despacho) throw new CustomError("despacho no encontrado", 404);
        res.status(200).json({ despacho });
      } else {
        const despachos = await Despacho.find({estado:true}).populate("reparticiones");
        res.status(200).json({ despachos });
      }
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
    }
  };

  module.exports = {
   agregarDespacho,
   getDespachos
  }