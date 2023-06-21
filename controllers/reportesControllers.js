const Reporte = require("../models/Reporte");
const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');

const agregarReporte= async (req, res) => {
  try {
    const { fecha,detalle,naturaleza,usuario,userName,subcategoria,dispositivo,categoria} = req.body;

    const folderPath = `C:\\Users\\guill\\Desktop\\COM\\SysGesCOM-back\\uploads\\${userName}`;

    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Error al leer la carpeta:', err);
        return;
      }
 
      const lastFile = files[files.length - 1];
      const filePath = path.join(folderPath, lastFile);
    
    const newReporte = new Reporte({
      fecha,
      categoria,
      detalle,
      naturaleza,
      usuario,
      subcategoria,
      dispositivo,
      rutaImagen:filePath
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
      res.status(200).json({ reporte });
    } else {
      const reportes = await Reporte.find({estado:true}).populate("naturaleza").populate("categoria").populate("subcategoria").populate("usuario").populate("dispositivo");
      res.status(200).json({ reportes });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
    agregarReporte,
    getReportes
  }
  