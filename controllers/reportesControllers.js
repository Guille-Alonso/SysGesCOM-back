const Reporte = require("../models/Reporte");
const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');

const agregarReporte= async (req, res) => {
  try {
    const { fecha,detalle,naturaleza,usuario,userName,subcategoria,dispositivo,categoria} = req.body;

    const folderPath = `./uploads/${userName}`;

    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Error al leer la carpeta:', err);
        return;
      }
    
      // Obtener el último archivo de la lista
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

const getImages = async (req,res)=>{
  try {
    const report = await Reporte.find(req.params.id)
console.log(report);
    const imagePath = path.join(__dirname,report.rutaImagen)

    // Envía la imagen como respuesta
    res.sendFile(imagePath);
  } catch (error) {
    res
    .status(error.code || 500)
    .json({ message: error.message || "algo explotó :|" });
  }
 
}

module.exports = {
    agregarReporte,
    getImages
  }
  