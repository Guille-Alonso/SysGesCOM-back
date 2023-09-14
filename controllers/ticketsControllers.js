const Ticket = require("../models/Tickets");
const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');
const User = require("../models/User");

const agregarTicket = async (req, res) => {
    try {
      const { fecha, descripcion, usuario, userName, dispositivo, photo, titulo } = req.body;
  
      const folderPath = `C:\\Users\\pedro\\Desktop\\COMM\\SysGesCOM-back\\uploads\\${userName}`;
      let filePath = "";
  
      fs.readdir(folderPath, async (err, files) => {
        if (err) {
          console.error('Error al leer la carpeta:', err);
        } else {
          const lastFile = files[files.length - 1];
          filePath = path.join(folderPath, lastFile);
        }
  
      });
  
      const ultimoTicket = await Ticket.find().sort({ _id: -1 }).limit(1);
      const nuevoNumeroDeTicket = ultimoTicket.length > 0 ? ultimoTicket[0].numero + 1 : 1;
  
      // Verificar si el número de reporte ya existe en la colección
      const existeTicket = await Ticket.findOne({ numero: nuevoNumeroDeTicket });
  
      if (existeTicket) {
        res.status(400).json({ message: "Intente de nuevo en breve" });
      } else {
  
      const newTicket = new Ticket({
        numero: nuevoNumeroDeTicket,
        fecha,
        descripcion,
        usuario,
        dispositivo: dispositivo == "" ? null : dispositivo,
        titulo,
        rutaImagen: photo == undefined ? filePath : ""
      });

      await newTicket.save();
      res.status(200).json({ message: "Se agregó un nuevo Ticket con éxito" });
    }
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
  
        res.status(400).json({ message: "Hubo un error, intente nuevamente" });
  
      } else {
  
        res.status(error.code || 500).json({ message: 'Error al crear Ticket' });
      }
     
    }
  };

    module.exports = {
        agregarTicket,
      }
      