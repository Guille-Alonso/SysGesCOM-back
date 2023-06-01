const NaturalezaEvento = require("../models/NaturalezaEvento");
const CustomError = require("../utils/customError");

const agregarNaturalezaEvento = async (req, res) => {
  try {
    const { nombre} = req.body;

    const newNaturaleza = new NaturalezaEvento({
      nombre
    });

    await newNaturaleza.save();

    res.status(201).json({ message: "Se agregó una nueva naturaleza de evento con éxito" });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

module.exports = {
  agregarNaturalezaEvento
  }
  