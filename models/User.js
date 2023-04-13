const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true,"nombre obligatorio"],
        trim: true,
        minLength: [3,'no puede tener menos de 3 caracteres'],
        maxLength: [30, 'no puede tener mas de 30 caracteres']
    },
    email:{
        type: String,
        required:[true,'el email es obligatorio'],
        trim:true,
        unique: [true,'ya existe un usuario con ese email'],
        lowercase:true
    },
    password:{
        type: String,
        required: [true,"contraseña obligatoria"],
        trim: true,
        minLength: [7,'no puede tener menos de 7 caracteres'],
        maxLength: [150, 'no puede tener mas de 50 caracteres']
    },
    admin:{
         type:Boolean,
        default:false
    }
  
},
{
    versionKey : false,
    timestamps: false
});

UserSchema.methods.toJSON = function () {
    const { password, ...user } = this.toObject();
    return user;
  };

module.exports = model('User',UserSchema)