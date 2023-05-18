const {Schema,model} = require('mongoose');

const DespachoSchema = new Schema(
    {
        fecha: {
            type: String,
            required: [true, "La fecha es requerida"],
        },
        acuse: {
            type: String,
            required: [true, "El acuse es requerido"],
            trim: true,
        },
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
        reporte:{
            type: Schema.Types.ObjectId,
            ref: "Reporte",
            required: [true, "El reporte es requerido"],
        },
        reparticion:{
            type: Array
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Despacho',DespachoSchema);