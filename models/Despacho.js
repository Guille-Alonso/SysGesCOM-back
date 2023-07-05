const {Schema,model} = require('mongoose');

const DespachoSchema = new Schema(
    {
        fecha: {
            type: String,
            required: [true, "La fecha es requerida"],
        },
        acuse: {
            type: String,
            trim: true,
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
        reparticiones:[{
            type: Schema.Types.ObjectId,
            ref: "Reparticion",
            required: [true, "La repartición es requerida"],
        }],
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Despacho',DespachoSchema);