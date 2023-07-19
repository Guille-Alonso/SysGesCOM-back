const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const ReparticionSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            trim: true,
            uppercase:true,
            minLength: [2, "Debe tener al menos 4 caracteres"],
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

ReparticionSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('Reparticion',ReparticionSchema);