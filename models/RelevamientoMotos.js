const { Schema, model } = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const RelevamientoMotosSchema = new Schema(
    {
        personas: {
            type: Number,
            required: [true, "El campo personas es requerido"],
        },
        cascos: {
            type: Number,
            required: [true, "El campo casco es requerido"],
        },
        luces: {
            type: Boolean,
            required: [true, "Las luces son requeridas"],
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

RelevamientoMotosSchema.plugin(mongooseUniqueValidator, {
    message: '{PATH} debe ser único'
})

module.exports = model('RelevamientoMotos', RelevamientoMotosSchema);