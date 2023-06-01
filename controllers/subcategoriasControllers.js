const Subcategoria = require("../models/Subcategoria");
const CustomError = require("../utils/customError");

const agregarSubcategoria= async (req, res) => {
  try {
    const { nombre,categoria} = req.body;

    const newSubcategoria = new Subcategoria({
      nombre,
      categoria
    });

    await newSubcategoria.save();

    res.status(201).json({ message: "Se agregó una nueva subcategoría con éxito" });
  } catch (error) {
    res.status(error.code || 500)
      .json({
        message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
      });
  }
};

const getSubcategorias = async (req, res) => {
  try {
    if (req.params.nombre) {
      const subcategoria = await Subcategoria.findOne({ nombre: req.params.nombre });
      if (!subcategoria) throw new CustomError("Subcategoria no encontrada", 404);
      res.status(200).json({ subcategoria });
    } else {
      const subcategorias = await Subcategoria.find();
      res.status(200).json({ subcategorias });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
    agregarSubcategoria,
    getSubcategorias
  }
  