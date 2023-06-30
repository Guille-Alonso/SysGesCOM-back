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
        reparticiones:[{
            type: Schema.Types.ObjectId,
            ref: "Reparticion",
            // required: [true, "La repartición es requerida"],
        }],
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Despacho',DespachoSchema);