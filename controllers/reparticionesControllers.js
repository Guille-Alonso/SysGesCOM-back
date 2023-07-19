const Reparticion = require("../models/Reparticion");
const CustomError = require("../utils/customError");

const agregarReparticion= async (req, res) => {
    try {
      const { nombre} = req.body;
  
      const newReparticion = new Reparticion({
        nombre
      });
  
      await newReparticion.save();
  
      res.status(201).json({ message: "Se agregó una nueva repartición con éxito" });
    } catch (error) {
      res.status(error.code || 500)
        .json({
          message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
        });
    }
  };
  
  const getReparticiones = async (req, res) => {
    try {
      if (req.params.id) {
        const reparticion = await Reparticion.findById(req.params.id);
        if (!reparticion) throw new CustomError("Reparticion no encontrada", 404);
        res.status(200).json({ reparticion });
      } else {
        const reparticiones = await Reparticion.find({estado:true});
        res.status(200).json({ reparticiones });
      }
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
    }
  };

  module.exports = {
   agregarReparticion,
   getReparticiones
  }