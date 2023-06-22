const {Schema,model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

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
        estado:{//borrado logico
            type: Boolean,
            default: true
        },
        rutaImagen: {
            type: String,
            trim: true,
        },
        naturaleza:{//quizá no haga falta pq categoría ya la indica..
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
        dispositivo:{
            type: Schema.Types.ObjectId,
            ref: "Dispositivo",
            required: [true, "El dispositivo es requerido"],
        },
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

ReporteSchema.plugin(mongooseUniqueValidator,{
    message: '{PATH} debe ser único'
    })  


module.exports = model('Reporte',ReporteSchema);