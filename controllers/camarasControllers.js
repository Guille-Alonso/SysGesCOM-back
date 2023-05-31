const Dispositivo = require("../models/Dispositivo");
const CustomError = require("../utils/customError");

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
      const camaras = await Dispositivo.find({estado:true});
      res.status(200).json({ camaras });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const actualizarCamara =
  async (req, res) => {
    // Actualizar una camara por su ID
    try {
      const { id } = req.params;
      const updatedCamera = req.body; // Los datos actualizados del usuario
    
      // Encuentra y actualiza el usuario en la base de datos
      const camara = await Dispositivo.findByIdAndUpdate(id, updatedCamera, { new: true,runValidators: true });
      if(!camara) throw new CustomError("camara no encontrada",404)
      res.status(200).json({message:"camara modificada con exito",camara});
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
        res.status(500).json({ error: 'Error al actualizar el dispositivo' });
      }
    
    }
  }

  const borrarCamara = async (req,res)=>{
    try {
      const { id } = req.body;
      const cameraRemove = {
        estado:false
      }
      const camaraEliminada = await Dispositivo.findByIdAndUpdate(id,cameraRemove,{new:true})
      if(!camaraEliminada) throw new CustomError("cámara no encontrada",404)
      res.status(200).json({message:"Cámara eliminada con éxito"})
    } catch (error) {
      res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
    }
  }

module.exports = {
  agregarCamara,
  getCamara,
  actualizarCamara,
  borrarCamara
}
