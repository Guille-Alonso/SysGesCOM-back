const Vehiculos = require("../models/Vehiculos");
const Reporte = require("../models/Reporte");
const CustomError = require("../utils/customError");

const agregarVehiculo = async (req, res) => {
    try {

        const { arrayVehiculos, reporte } = req.body;

        const ultimoReporte = await Reporte.find().sort({ _id: -1 }).limit(1);
        const newReporte = new Reporte({
            numero: ultimoReporte.length > 0 ? ultimoReporte[0].numero + 1 : 1,
            fecha: reporte.fecha,
            categoria: reporte.categoria,
            detalle: reporte.detalle,
            naturaleza: reporte.naturaleza,
            usuario: reporte.usuario,
            subcategoria: reporte.subcategoria == "" ? null : reporte.subcategoria,
            dispositivo: reporte.dispositivo,
            rutaImagen: ""
        });

        const reporteSaved = await newReporte.save();

        for (let index = 0; index < arrayVehiculos.length; index++) {
            let clave = Object.keys(arrayVehiculos[index])[0];
            let valor = arrayDeObjetos[index][clave];
            if (valor !== 0) {
                let newVehiculos = new Vehiculos({
                    vehiculo: clave,
                    cantidad: valor,
                    reporte: reporteSaved._id
                });
                console.log(newVehiculos);
                await newVehiculos.save();
            }

        }
        res.status(201).json({ message: "Se agregó un nuevo reporte de vehículo" });
    } catch (error) {
        res.status(error.code || 500)
            .json({
                message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
            });
    }
};


const getVehiculos = async (req, res) => {
    try {
        if (req.params.solicitante) {
            const motos = await RelevamientoMotos.findOne();
            if (!motos) throw new CustomError("Relevamiento de motos no encontrados", 404);
            res.status(200).json({ motos });
        } else {
            const motos = await RelevamientoMotos.find().populate({
                path: 'reporte',
                populate: [
                    {
                        path: 'dispositivo',
                        model: 'Dispositivo'
                    },
                    {
                        path: 'subcategoria',
                        model: 'Subcategoria'
                    }
                ]
            })

            res.status(200).json({ motos });
        }
    } catch (error) {
        res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
    }
};

module.exports = {
    agregarVehiculo,
    getVehiculos,
}