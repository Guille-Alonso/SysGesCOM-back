const User = require("../models/User");
const Rol = require("../models/Rol");
const CustomError = require("../utils/customError");

const agregarRol = async (req, res) => {
    try {
      console.log(req.body);
      const { nombre } = req.body;
      const newRol = new Rol({
        nombre
      });
      await newRol.save();
      res.status(201).json({ message: "Se agregó un nuevo rol con éxito" });
    } catch (error) {
      res.status(error.code || 500)
        .json({
          message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
        });
    }
  };

  const getRoles = async (req, res) => {
    try {
   
        const roles = await Rol.find({estado:true});
        res.status(200).json({ roles });
      
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
    }
  };
  
  const actualizarRol = async (req, res) => {
     
      try {
        const { id } = req.params;
        const updatedRol = req.body; 
   
        const rol = await Rol.findByIdAndUpdate(id, updatedRol, { new: true,runValidators: true });
        if(!rol) throw new CustomError("rol no encontrado",404)
        res.status(200).json({message:"rol modificado con exito",rol});
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
          res.status(500).json({ error: 'Error al actualizar el rol' });
        }
      
      }
    }
  
    const borrarRol = async (req,res)=>{
      try {
        const { id } = req.body;
        const rolRemove = {
          estado:false
        }
        const rolEliminado = await Rol.findByIdAndUpdate(id,rolRemove,{new:true})
        if(!rolEliminado) throw new CustomError("rol no encontrado",404)
        res.status(200).json({message:"rol eliminado con éxito"})
      } catch (error) {
        res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
      }
    }

const actualizarCampoRolParaTodos = async (req, res) => {
    try {
  
        // const roles = await Rol.find({}); 

        // const rolesPorTipoDeUsuario = {};

        // roles.forEach((rol) => {
        //   rolesPorTipoDeUsuario[rol.nombre.toLowerCase()] = rol._id;
        // });
    
        // await User.updateMany({}, [
        //     {
        //       $set: {
        //         rol: {
        //           $switch: {
        //             branches: [
        //               {
        //                 case: { $eq: ["$tipoDeUsuario", "admin"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["admin"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$tipoDeUsuario", "visualizador"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["visualizador"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$tipoDeUsuario", "supervisor"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["supervisor"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$tipoDeUsuario", "estadística"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["estadística"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$tipoDeUsuario", "administración"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["administración"], null] },
        //               },
        //             ],
        //             default: null, // Valor por defecto si no coincide con ningún caso
        //           },
        //         },
        //       },
        //     },
        //   ]);
  
        // await User.updateMany({}, { $unset: { tipoDeUsuario: '' } }); // para borrar un campo determinado en todos los documentos de una coleccion
        // await User.updateMany({}, { $rename: { rol: "tipoDeUsuario" } }); // para cambiarle el nombre a un campo a todos los documentos de una coleccion


      res.status(200).json({ message: 'Campo actualizado con éxito en todos los usuarios' });

    } catch (error) {
      res.status(error.code || 500).json({ message: error.message || 'Algo explotó :|' });
    }
  };

  module.exports = {
    actualizarCampoRolParaTodos,
    agregarRol,
    getRoles,
    actualizarRol,
    borrarRol
}