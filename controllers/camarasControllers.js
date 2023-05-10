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

const getCamara = async (req, res) => {
  try {
    if (req.params.nombre) {
      const camara = await Dispositivo.findOne({ nombre: req.params.nombre });
      if (!camara) throw new CustomError("Camara no encontrada", 404);
      res.status(200).json({ camara });
    } else {
      const camaras = await Dispositivo.find();
      res.status(200).json({ camaras });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
  agregarCamara,
  getCamara
}
