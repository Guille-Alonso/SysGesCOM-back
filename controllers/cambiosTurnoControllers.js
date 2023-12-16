const PedidoCambio = require("../models/PedidoCambio");
const CustomError = require("../utils/customError");

const agregarPedidoCambio = async (req, res) => {
    try {
        const { pedido, estado, solicitante,pedidoDevolucion} = req.body;
        const newPedidoCambio = new PedidoCambio({
            pedido,
            estado,
            pedidoDevolucion,
            solicitante
        });
         await newPedidoCambio.save();
        res.status(201).json({ message: "Se agregó un nuevo pedido de cambio" });
    } catch (error) {
        res.status(error.code || 500)
            .json({
                message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
            });
    }
};


const getCambios = async (req, res) => {
    try {
        if (req.params.solicitante) {
            const cambios = await PedidoCambio.findOne({ solicitante: req.params.solicitante });
            if (!cambios) throw new CustomError("Cambios no encontrados", 404);
            res.status(200).json({ cambios });
        } else {
            console.log(req.user.tipoDeUsuario);
            const cambiosBack = await PedidoCambio.find().populate({
                path: 'solicitante',
                model: 'User',
                populate: [
                  { path: 'tipoDeUsuario' },
                  { path: 'turno' }
                ]
              }).populate({
                path: 'solicitado',
                model: 'User',
                populate: [
                  { path: 'tipoDeUsuario' },
                  { path: 'turno' }
                ]
              });
              

            if(req.user.tipoDeUsuario.nombre=="admin" || req.user.tipoDeUsuario.nombre=="administración"){
             
                res.status(200).json({ cambios:cambiosBack });
            }else{

                const cambios = cambiosBack.filter(camb=>camb.solicitante.tipoDeUsuario.nombre == req.user.tipoDeUsuario.nombre)
                res.status(200).json({ cambios });
            }

        }
    } catch (error) {
        res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
    }
};

const getCambiosVisualizador = async (req, res) => {
    try {
        const cambios = await PedidoCambio.find({   $or: [
            { solicitante: req.user._id },
            { solicitado: req.user._id }
          ] }).populate({
            path: 'solicitante',
            model: 'User',
            populate: [
              { path: 'tipoDeUsuario' },
              { path: 'turno' }
            ]
          }).populate({
            path: 'solicitado',
            model: 'User',
            populate: [
              { path: 'tipoDeUsuario' },
              { path: 'turno' }
            ]
          });

        res.status(200).json({ cambios });

    } catch (error) {
        res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
    }
}

const confirmarCambio =
    async (req, res) => {
        // Actualizar una camara por su ID
        try {
            const { id } = req.params;
            const confirmarPedidoCambio = req.body; // Los datos actualizados del usuario

            // Encuentra y actualiza el usuario en la base de datos
            const cambio = await PedidoCambio.findByIdAndUpdate(id, confirmarPedidoCambio, { new: true, runValidators: true });
            if (!cambio) throw new CustomError("cambio no encontrado", 404)
            res.status(200).json({ message: "cambio confirmado", cambio });
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
                res.status(500).json({ error: 'Error al confirmar cambio' });
            }

        }
    }

    const deletePedidoCambio = async (req, res) => {
        try {
          const { id } = req.body;
          const pedidoRemoved = await PedidoCambio.findByIdAndDelete(id);
          if (!pedidoRemoved) throw new CustomError("Pedido no encontrado", 404);
          res.status(200).json({ message: "El Pedido de cambio ha sido eliminado" });
        } catch (error) {
          res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
        }
      };

module.exports = {
    agregarPedidoCambio,
    getCambios,
    confirmarCambio,
    getCambiosVisualizador,
    deletePedidoCambio
}