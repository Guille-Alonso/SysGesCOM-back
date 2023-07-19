const Categoria = require("../models/Categoria");
const NaturalezaEvento = require("../models/NaturalezaEvento");
const Subcategoria = require("../models/Subcategoria");
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

const getNaturaleza = async (req, res) => {
  try {
    if (req.params.nombre) {
      const naturaleza = await NaturalezaEvento.findOne({ nombre: req.params.nombre });
      if (!naturaleza) throw new CustomError("Naturaleza de evento no encontrada", 404);
      res.status(200).json({ naturaleza });
    } else {
      const naturalezas = await NaturalezaEvento.find();
      res.status(200).json({ naturalezas });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const getDatos = async (req, res) => {
  try {
    
      const naturalezas = await NaturalezaEvento.find();
      const categorias = await Categoria.find({estado:true}).populate("naturaleza");
      const subcategorias = await Subcategoria.find({estado:true}).populate("categoria");

      res.status(200).json({ naturalezas,categorias,subcategorias });
    
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
  agregarNaturalezaEvento,
  getNaturaleza,
  getDatos
  }
  