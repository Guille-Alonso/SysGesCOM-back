const { Schema, model } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const VehiculosSchema = new Schema(
    {
        vehiculo: {
            type: String,
            required: [true, "El tipo de vehiculo es requerido"],
            enum: [
                "bicicleta/moto",
                "auto/camioneta",
                "camion",
                "colectivo",
            ],
        },
        cantidad: {
            type: Number,
            required: [true, "La cantidad es requerida"],
        },
        reporte: {
            type: Schema.Types.ObjectId,
            ref: "Reporte",
            required: [true, "El reporte es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

// VehiculosSchema.plugin(mongooseUniqueValidator, {
//     message: '{PATH} debe ser único'
// })

module.exports = model('Vehiculos', VehiculosSchema);