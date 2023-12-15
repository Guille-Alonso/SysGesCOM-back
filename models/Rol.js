const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const RolSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            trim: true,
            uppercase:true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [20, "Debe tener como máximo 20 caracteres"],
            required: [true, "El nombre es requerido"],
        },
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

RolSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('Rol',RolSchema);