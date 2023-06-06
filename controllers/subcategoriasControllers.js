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
    if (req.params.idCat) {
      const subcategorias = await Subcategoria.find({ categoria: req.params.idCat , estado:true}).populate("categoria");
      if (!subcategorias) throw new CustomError("Categoria no encontrada", 404);
      res.status(200).json({ subcategorias });
    } else {
      const subcategorias = await Subcategoria.find({estado:true});
      res.status(200).json({ subcategorias });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const borrarSubcategoria = async (req,res)=>{
  try {
    const { id } = req.body;
    const subcategoriaRemove = {
      estado:false
    }
    const subcategoriaEliminada = await Subcategoria.findByIdAndUpdate(id,subcategoriaRemove,{new:true})
    if(!subcategoriaEliminada) throw new CustomError("Subcategoría no encontrada",404)
    res.status(200).json({message:"Subcategoría eliminada con éxito"})
  } catch (error) {
    res
    .status(error.code || 500)
    .json({ message: error.message || "algo explotó :|" });
  }
}

const actualizarSubcategoria = async (req, res) => {
  
  try {
    const { id } = req.params;
    const updatedSubcategoria = req.body;
  
    const subcategoria = await Subcategoria.findByIdAndUpdate(id, updatedSubcategoria, { new: true,runValidators: true });
    if(!subcategoria) throw new CustomError("Subcategoría no encontrada",404)
    res.status(200).json({message:"Subcategoría modificada con exito",subcategoria});
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
      res.status(500).json({ error: 'Error al actualizar la Subcategoría' });
    }
  
  }
}

module.exports = {
    agregarSubcategoria,
    getSubcategorias,
    borrarSubcategoria,
    actualizarSubcategoria
  }
  