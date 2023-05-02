const {Schema,model} = require('mongoose');

const UserSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [4, "Debe tener al menos 4 caracteres"],
      maxLength: [20, "Debe tener como máximo 20 caracteres"],
      required: [true, "El nombre de usuario es requerido"],
    },
    nombre: {
        type: String,
        trim:true,
        uppercase:true,
        minLength: [2, "Debe tener al menos 2 caracteres"],
        maxLength: [30, "Debe tener como máximo 30 caracteres"],
        required: [true, "El nombre es requerido"],
    },
    apellido: {
        type: String,
        trim:true,
        uppercase:true,
        minLength: [2, "Debe tener al menos 2 caracteres"],
        maxLength: [30, "Debe tener como máximo 30 caracteres"],
        required: [true, "El apellido es requerido"],
    },
    email: { 
        type: String, 
        unique: true, 
        trim: true, 
        lowercase: true,
        required: [true, "El email es requerido"],
    },
    foto: {
      type: Buffer,
      validate: {
        validator: function(v) {
          return Buffer.isBuffer(v);
        },
        message: "El campo 'foto' debe ser de tipo Buffer",
      },
    },
    turno: {
        type: String,
        enum: ["mañana", "tarde", "noche"],
        trim: true,
        uppercase:true,
        required: [true, "El turno es requerido"],
    },
    tipoDeUsuario: {
        type: String,
        enum: ["admin", "visualizador", "supervisor","estadística","administración"],
        trim: true,
        uppercase:true,
        required: [true, "El tipo de usuario es requerido"],
    },
      
    contraseña: {
        type: String,
        trim: true,
        required: [true, "La contraseña es obligatoria"],
      },
  
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

UserSchema.methods.toJSON = function () {
    const { contraseña, ...user } = this.toObject();
    return user;
  };

module.exports = model('User',UserSchema)