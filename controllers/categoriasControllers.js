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
      const categorias = await Categoria.find({estado:true});
      res.status(200).json({ categorias });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const borrarCategoria = async (req,res)=>{
  try {
    const { id } = req.body;
    const categoriaRemove = {
      estado:false
    }
    const categoriaEliminada = await Categoria.findByIdAndUpdate(id,categoriaRemove,{new:true})
    if(!categoriaEliminada) throw new CustomError("Categoría no encontrada",404)
    res.status(200).json({message:"Categoría eliminada con éxito"})
  } catch (error) {
    res
    .status(error.code || 500)
    .json({ message: error.message || "algo explotó :|" });
  }
}

const actualizarCategoria = async (req, res) => {
  
    try {
      const { id } = req.params;
      const updatedCategoria = req.body;
    
      const categoria = await Categoria.findByIdAndUpdate(id, updatedCategoria, { new: true,runValidators: true });
      if(!categoria) throw new CustomError("Categoría no encontrada",404)
      res.status(200).json({message:"Categoría modificada con exito",categoria});
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Si el error es una validación de Mongoose
        const errors = Object.values(error.errors).map(err => err.message);
        let errorMje = "";
        for (let index = 0; index < errors.length; index++) {
          errorMje = errorMje + '-' + errors[index]
          
        }
        console.log(errorMje);
        res.status(400).json({ errorMje });
      } else {
        // Otro tipo de error
        res.status(500).json({ error: 'Error al actualizar la categoría' });
      }
    
    }
  }

module.exports = {
    agregarCategoria,
    getCategorias,
    borrarCategoria,
    actualizarCategoria
  }
  