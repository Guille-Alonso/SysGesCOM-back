const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const getNextSequenceValue = require('../middlewares/numeroEventoUnico');

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
    estado: {
      //borrado logico
      type: Boolean,
      default: true,
    },
    numero: { type: Number ,unique:true},
    rutaImagen: {
      type: String,
      trim: true,
    },
    despacho: {
      type: Schema.Types.ObjectId,
      ref: "Despacho",
    },
    naturaleza: {
      type: Schema.Types.ObjectId,
      ref: "NaturalezaEvento",
      required: [true, "El tipo de evento es requerido"],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es requerido"],
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoria es requerida"],
    },
    subcategoria: {
      type: Schema.Types.ObjectId,
      ref: "Subcategoria",
    },
    dispositivo: {
      type: Schema.Types.ObjectId,
      ref: "Dispositivo",
      required: [true, "El dispositivo es requerido"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ReporteSchema.pre('save', async function (next) {
    if (!this.numero) {
      const sequenceValue = await getNextSequenceValue('Reporte');
      this.numero = sequenceValue;
    }
    next();
  });

ReporteSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  


module.exports = model('Reporte',ReporteSchema);