const { Schema, model } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const PedidoCambioSchema = new Schema(
    {
        pedido: {
            type: String,
            unique: false,
            trim: true,
            required: [true, "La fecha de cambio es requerida"],
        },
        solicitante: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El usuario es requerido"],
        },
        pedidoDevolucion: {
            type: String,
            unique: false,
            trim: true,
            required: false
        },
        solicitado: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        estado: {
            type: String,
            enum: ["consultado", "acordado", "confirmado"],
            trim: true,
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

PedidoCambioSchema.plugin(mongooseUniqueValidator, {
    message: '{PATH} debe ser único'
})

module.exports = model('PedidoCambio', PedidoCambioSchema);