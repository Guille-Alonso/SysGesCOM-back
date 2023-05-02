const {Schema,model} = require('mongoose');

const CategoriaSchema = new Schema(
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
        naturaleza:{
            type: Schema.Types.ObjectId,
            ref: "NaturalezaEvento",
            required: [true, "El tipo de evento es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Categoria',CategoriaSchema);