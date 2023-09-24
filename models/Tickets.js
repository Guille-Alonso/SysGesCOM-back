const { Schema, model } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const ticketsSchema = new Schema(
    {
        fecha: {
            type: String,
            required: [true, "La fecha es requerida"],
        },
        titulo: {
            type: String,
            required: [true, "El titulo es requerido"],
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [200, "Debe tener como máximo 200 caracteres"],
            trim: true,
        },
        descripcion: {
            type: String,
            required: [true, "La descripcion es requerida"],
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [1000, "Debe tener como máximo 1000 caracteres"],
            trim: true,
        },
        estado: {
            //borrado logico
            type: Boolean,
            default: true,
        },
        estadoTicket: {
            type: String,
            enum: ["En Curso", "Resuelto", "Nuevo"],
            trim: true,
            required: [true, "El turno es requerido"],
        },
        numero: {
            type: Number,
            unique: true,
        },
        rutaImagen: {
            type: String,
            trim: true,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El usuario es requerido"],
        },
        dispositivo: {
            type: Schema.Types.ObjectId,
            ref: "Dispositivo",
            //   required: [true, "El dispositivo es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


ticketsSchema.plugin(mongooseUniqueValidator, {
    message: '{PATH} debe ser único'
})


module.exports = model('Tickets', ticketsSchema);