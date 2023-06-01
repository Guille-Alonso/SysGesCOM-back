const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const NaturalezaEventoSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            trim: true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [20, "Debe tener como máximo 20 caracteres"],
            required: [true, "El nombre es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

NaturalezaEventoSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('NaturalezaEvento',NaturalezaEventoSchema);