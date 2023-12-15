const User = require("../models/User");
const Turno = require("../models/Turno");
const CustomError = require("../utils/customError");

const agregarTurno = async (req, res) => {
    try {
      console.log(req.body);
      const { nombre, horario } = req.body;
      const newTurno = new Turno({
        nombre,
        horario
      });
      await newTurno.save();
      res.status(201).json({ message: "Se agregó un nuevo turno con éxito" });
    } catch (error) {
      res.status(error.code || 500)
        .json({
          message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
        });
    }
  };

  const getTurnos = async (req, res) => {
    try {
   
        const turno = await Turno.find({estado:true});
        res.status(200).json({ turno });
      
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
    }
  };
  
  const actualizarTurno = async (req, res) => {
     
      try {
        const { id } = req.params;
        const updatedTurno = req.body; 
   
        const turno = await Turno.findByIdAndUpdate(id, updatedTurno, { new: true,runValidators: true });
        if(!turno) throw new CustomError("turno no encontrado",404)
        res.status(200).json({message:"turno modificado con exito",turno});
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
          res.status(500).json({ error: 'Error al actualizar el turno' });
        }
      
      }
    }
  
    const borrarTurno = async (req,res)=>{
      try {
        const { id } = req.body;
        const turnoRemove = {
          estado:false
        }
        const turnoEliminado = await Turno.findByIdAndUpdate(id,turnoRemove,{new:true})
        if(!turnoEliminado) throw new CustomError("turno no encontrado",404)
        res.status(200).json({message:"turno eliminado con éxito"})
      } catch (error) {
        res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :|" });
      }
    }


const actualizarCampoTurnoParaTodos = async (req, res) => {
    try {
  
      
        // const turnos = await Turno.find({}); 

        // const rolesPorTipoDeUsuario = {};

        // turnos.forEach((rol) => {
        //   rolesPorTipoDeUsuario[rol.nombre.toLowerCase()] = rol._id;
        // });
    
        // await User.updateMany({}, [
        //     {
        //       $set: {
        //         turnoTrabajo: {
        //           $switch: {
        //             branches: [
        //               {
        //                 case: { $eq: ["$turno", "mañana"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["mañana"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$turno", "tarde"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["tarde"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$turno", "intermedio"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["intermedio"], null] },
        //               },
        //               {
        //                 case: { $eq: ["$turno", "noche"] },
        //                 then: { $ifNull: [rolesPorTipoDeUsuario["noche"], null] },
        //               },
        //             ],
        //             default: null, // Valor por defecto si no coincide con ningún caso
        //           },
        //         },
        //       },
        //     },
        //   ]);
        //  await User.updateMany({}, { $unset: { turno: '' } }); // para borrar un campo determinado en todos los documentos de una coleccion
        // await User.updateMany({}, { $rename: { turnoTrabajo: "turno" } }); // para cambiarle el nombre a un campo a todos los documentos de una coleccion
  
      res.status(200).json({ message: 'Campo actualizado con éxito en todos los usuarios xd' });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message || 'Algo explotó :|' });
    }
  };

  module.exports = {
    actualizarCampoTurnoParaTodos,
    agregarTurno,
    getTurnos,
    borrarTurno,
    actualizarTurno
}