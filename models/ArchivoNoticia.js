const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const ArchivoNoticiaSchema = new Schema(
    {
        rutaArchivo: {
            type: String,
            trim: true,
          },
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
        noticia:{
            type: Schema.Types.ObjectId,
            ref: "Noticia",
            required: [true, "La noticia es requerida"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

ArchivoNoticiaSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  

module.exports = model('ArchivoNoticia',ArchivoNoticiaSchema);