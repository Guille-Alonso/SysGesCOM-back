const Ticket = require("../models/Tickets");
const CustomError = require("../utils/customError");
const path = require('path');
const fs = require('fs');
const User = require("../models/User");
const Tickets = require("../models/Tickets");

const agregarTicket = async (req, res) => {
  try {
    const { fecha, descripcion, usuario, userName, dispositivo, photo, titulo } = req.body;

    const folderPath = `C:\\Users\\tsa.ortiz\\Desktop\\Sistema COM\\SysGesCOM-back\\uploads\\${userName}`;
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
        rutaImagen: photo == undefined ? filePath : "",
        estadoTicket: "Nuevo"
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

const getTickets = async (req, res) => {
  try {
    if (req.params.id) {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) throw new CustomError("Ticket no encontrado", 404);

      if (fs.existsSync(ticket.rutaImagen)) {
        res.sendFile(ticket.rutaImagen);
      } else {
        throw new CustomError("Imágen no encontrada", 404);
      }

    } else {

      const tickets = await Tickets.find({ estado: true }).populate("usuario").populate("dispositivo");
      res.status(200).json({ tickets });
    }

  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const borrarTicket = async (req, res) => {
  try {
    const { id } = req.body;
    const ticketRemove = {
      estado: false
    }
    const ticketEliminado = await Tickets.findByIdAndUpdate(id, ticketRemove, { new: true })
    if (!ticketEliminado) throw new CustomError("ticket no encontrado", 404)
    res.status(200).json({ message: "Ticket eliminado con éxito" })
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const actualizarTicket = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const { id } = req.params;
    // const updatedTicket = req.body;

    //logica de la imagen a reemplazar
    //const folderPath = `C:\\Users\\Administrador\\Desktop\\Sistema de Gestion\\SysGesCOM-back-dev\\uploads\\${req.body.userName}`;
    const folderPath = `C:\\Users\\tsa.ortiz\\Desktop\\Sistema COM\\SysGesCOM-back\\uploads\\${req.body.userName}`;

    let filePath = "";

    if (req.body.rutaImagen !== "" && req.body.photo == undefined) {
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
      } else {
        const lastFile = files[files.length - 1];
        filePath = path.join(folderPath, lastFile);
      }

      const ticketUpd = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        dispositivo: req.body.dispositivo == "null" || req.body.dispositivo == "" ? null : req.body.dispositivo,
        rutaImagen: req.body.photo == undefined ? filePath : req.body.rutaImagen
      }
      const ticket = await Ticket.findByIdAndUpdate(id, ticketUpd, { new: true, runValidators: true });
      if (!ticket) throw new CustomError("Ticket no encontrado", 404)
      res.status(200).json({ message: "Ticket modificado con exito", ticket });
    });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

module.exports = {
  agregarTicket,
  borrarTicket,
  getTickets,
  actualizarTicket
}
