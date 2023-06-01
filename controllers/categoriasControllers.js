const Categoria = require("../models/Categoria");
const CustomError = require("../utils/customError");

const agregarCategoria= async (req, res) => {
  try {
    const { nombre,naturaleza} = req.body;

    const newCategoria = new Categoria({
      nombre,
      naturaleza
    });

    await newCategoria.save();

    res.status(201).json({ message: "Se agregó una nueva categoría con éxito" });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

const getCategorias = async (req, res) => {
  try {
    if (req.params.nombre) {
      const categoria = await Categoria.findOne({ nombre: req.params.nombre });
      if (!categoria) throw new CustomError("Categoria no encontrada", 404);
      res.status(200).json({ naturaleza });
    } else {
      const categorias = await Categoria.find();
      res.status(200).json({ categorias });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
    agregarCategoria,
    getCategorias
  }
  