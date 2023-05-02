const {Schema,model} = require('mongoose');

const ReporteSchema = new Schema(
    {
        fecha: {
            type: String,
            required: [true, "La fecha es requerida"],
        },
        detalle: {
            type: String,
            required: [true, "El detalle es requerido"],
            trim: true,
        },
        captura: {
            type: Buffer,
            required: true,
            validate: {
              validator: function(v) {
                return Buffer.isBuffer(v);
              },
              message: "El campo 'captura' debe ser de tipo Buffer",
            },
          },
        naturaleza:{
            type: Schema.Types.ObjectId,
            ref: "NaturalezaEvento",
            required: [true, "El tipo de evento es requerido"],
        },
        usuario:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El usuario es requerido"],
        },
        categoria:{
            type: Schema.Types.ObjectId,
            ref: "Categoria",
            required: [true, "La categoria es requerida"],
        },
        subcategoria:{
            type: Schema.Types.ObjectId,
            ref: "Subcategoria",
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

module.exports = model('Reporte',ReporteSchema);