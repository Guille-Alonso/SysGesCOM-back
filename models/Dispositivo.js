const {Schema,model} = require('mongoose');

const DispositivoSchema = new Schema(
    {
        nombre: {
            type: String,
            unique: true,
            trim: true,
            uppercase:true,
            minLength: [6, "Debe tener al menos 6 caracteres"],
            maxLength: [7, "Debe tener como máximo 7 caracteres"],
            required: [true, "El nombre es requerido"],
        },
        ubicacion:{
            type: String,
            trim: true,
            lowercase: true,
            minLength: [4, "Debe tener al menos 4 caracteres"],
            maxLength: [40, "Debe tener como máximo 40 caracteres"],
            required: [true, "La ubicación es requerida"],
        },
        tipo:{
            type: String,
            enum: ["camara","domo"],
            trim: true,
            uppercase:true,
            required: [true, "El tipo de cámara es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Dispositivo',DispositivoSchema);