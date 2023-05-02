const {Schema,model} = require('mongoose');

const SubcategoriaSchema = new Schema(
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
        categoria:{
            type: Schema.Types.ObjectId,
            ref: "Categoria",
            required: [true, "La categoría es requerida"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Subcategoria',SubcategoriaSchema);