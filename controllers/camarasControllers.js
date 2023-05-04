const Dispositivo = require("../models/Dispositivo");

const agregarCamara = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre, ubicacion, tipoDeCamara } = req.body;
    const newDispositivo = new Dispositivo({
      nombre,
      ubicacion,
      tipo: tipoDeCamara
    });
    await newDispositivo.save();
    res.status(201).json({ message: "Se agregó un nuevo dispositivo con éxito" });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

module.exports = {
  agregarCamara
}
