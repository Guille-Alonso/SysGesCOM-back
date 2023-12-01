const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const NoticiaSchema = new Schema(
    {
        titulo: {
            type: String,
            // unique: true,
            trim: true,
            uppercase:true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [200, "Debe tener como máximo 200 caracteres"],
            required: [true, "El título es requerido"],
        },
        fecha: {
            type: String,
            required: [true, "La fecha es requerida"],
          },
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El usuario es requerido"],
          },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

NoticiaSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('Noticia',NoticiaSchema);