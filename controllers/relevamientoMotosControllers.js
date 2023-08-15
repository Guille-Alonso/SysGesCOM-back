const RelevamientoMotos = require("../models/RelevamientoMotos");
const CustomError = require("../utils/customError");

const agregarRelevamientoMotos = async (req, res) => {
    try {
        console.log(req.body);
        const { personas, cascos, luces } = req.body;
        const newRelevamientoMotos = new RelevamientoMotos({
            personas,
            cascos,
            luces
        });
        await newRelevamientoMotos.save();
        res.status(201).json({ message: "Se agregó un nuevo reporte de relevamiento" });
    } catch (error) {
        res.status(error.code || 500)
            .json({
                message: error.message || "Ups! Hubo un problema, por favor intenta más tarde",
            });
    }
};


const getRelevamientoMotos = async (req, res) => {
    try {
        if (req.params.solicitante) {
            const motos = await RelevamientoMotos.findOne();
            if (!motos) throw new CustomError("Relevamiento de motos no encontrados", 404);
            res.status(200).json({ motos });
        } else {
            const motos = await RelevamientoMotos.find();
            res.status(200).json({ motos });
        }
    } catch (error) {
        res
            .status(error.code || 500)
            .json({ message: error.message || "algo explotó :|" });
    }
};

module.exports = {
    agregarRelevamientoMotos,
    getRelevamientoMotos,
}