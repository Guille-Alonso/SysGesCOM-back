const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const TurnoSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            trim: true,
            lowercase:true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [20, "Debe tener como máximo 20 caracteres"],
            required: [true, "El nombre es requerido"],
        },
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
        horario:{
            type: String,
            unique: true,
            trim: true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [25, "Debe tener como máximo 25 caracteres"],
            required: [true, "El horario es requerido"],
        }
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

TurnoSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('Turno',TurnoSchema);