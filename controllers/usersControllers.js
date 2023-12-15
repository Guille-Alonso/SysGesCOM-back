const User = require("../models/User");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const actualizarUser =
  async (req, res) => {
    // Actualizar un usuario por su ID
    try {
      const { id } = req.params;
      const updatedUser = req.body; // Los datos actualizados del usuario
      // console.log(req.params)
      console.log(updatedUser)
      // Encuentra y actualiza el usuario en la base de datos
      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true });
      if (!user) throw new CustomError("usuario no encontrado", 404)
      res.status(200).json({ message: "usuario modificado con exito", user });
    } catch (error) {
      // console.error('Error al actualizar el usuario:', error);
      if (error.name === 'ValidationError') {
        // Si el error es una validación de Mongoose
        const errors = Object.values(error.errors).map(err => err.message);
        let errorMje = "";
        for (let index = 0; index < errors.length; index++) {
          errorMje = errorMje + '-' + errors[index]

        }
        console.log(errorMje);
        res.status(400).json({ errorMje });
      } else {
        // Otro tipo de error
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      }

    }
  }

const getUsers = async (req, res) => {
  try {
    if (req.params.email) {
      const user = await User.findOne({ email: req.params.email });
      if (!user) throw new CustomError("Usuario no encontrado", 404);
      res.status(200).json({ user });
    } else {
      const users = await User.find({ estado: true }).populate("turno").populate("tipoDeUsuario");
      res.status(200).json({ users });
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const editarConstraseña = async (req, res) => {
  try {
    const { confirmPassword, confirmPasswordRepeat, userName } = req.body;
    const user = await User.findOne({ nombreUsuario: userName });
    if (user) {
      if (confirmPassword === confirmPasswordRepeat) {
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(confirmPassword, salt);
        await User.findByIdAndUpdate(user._id, { contraseña: passwordEncrypted })
      } else throw new CustomError("Las contraseñas no coinciden", 400)
      res.status(200).json({ mensaje: "Contraseña modificada con exito" })
    } else throw new CustomError("Usuario no encontrado", 404)
  } catch (error) {
    res.status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const editarConstraseñaUsuario = async (req, res) => {
  try {
    const { confirmPassword, confirmPasswordRepeat, userId, password } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    const passOk = await bcrypt.compare(password, user.contraseña);
    if (passOk) {
      if (confirmPassword === confirmPasswordRepeat) {
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(confirmPassword, salt);
        await User.findByIdAndUpdate(user._id, { contraseña: passwordEncrypted })
      } else throw new CustomError("Las contraseñas no coinciden", 400)
      res.status(200).json({ mensaje: "Contraseña modificada con exito" })
    } else throw new CustomError("Contraseña incorrecta", 400)
  } catch (error) {
    res.status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;

    const user = await User.findById(id);
    if (!user) throw new CustomError("Autenticación fallida", 401);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const login = async (req, res) => {
  try {
    const { nombreUsuario, contraseña } = req.body;
    if (!nombreUsuario || !contraseña)
      throw new CustomError("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne({ nombreUsuario });
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    const passOk = await bcrypt.compare(contraseña, user.contraseña);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h",
    });
    res
      .status(200)
      .json({ message: "Ingreso correcto", ok: true, user, token });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const agregarUsuario = async (req, res) => {
  try {
    console.log(req.body);

    const { userName, name, dni, numAfil, email, fechaNac, turno, password, perfilAltaUsuarios, repeatPassword, photo } = req.body;

    if (password !== repeatPassword)
      throw new CustomError("Las contraseñas no coinciden", 400);
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = new User({
      nombreUsuario: userName,
      nombre: name,
      dni,
      nacimiento: fechaNac,
      email,
      afiliado: numAfil,
      turno,
      tipoDeUsuario: perfilAltaUsuarios.toLowerCase(),//cambiar aqui y en front (enviar como tipoDeUsuario al id)
      contraseña: passwordEncrypted,
      foto: photo,
    });
    await user.save();
    res.status(200).json({ message: "Usuario creado con exito" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :(" });
  }
}

const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemove = {
      estado: false
    }
    const usuarioEliminado = await User.findByIdAndUpdate(id, userRemove, { new: true })
    if (!usuarioEliminado) throw new CustomError("usuario no encontrado", 404)
    res.status(200).json({ message: "Usuario eliminado con éxito" })
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const actualizarRelevamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true });
    if (!user) throw new CustomError("usuario no encontrado", 404)
    res.status(200).json({ message: "usuario modificado con exito", user });

  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}
const noticias = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true });
    if (!user) throw new CustomError("usuario no encontrado", 404)
    res.status(200).json({ message: "usuario modificado con exito", user });

  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
}

const actualizarCampoNoticiasParaTodos = async (req, res) => {
  try {

    await User.updateMany({}, { $set: { noticias: true } });

    res.status(200).json({ message: 'Campo actualizado con éxito en todos los usuarios' });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message || 'Algo explotó :|' });
  }
};
const ocultarCampoNoticiasParaTodos = async (req, res) => {
  try {

    await User.updateMany({}, { $set: { noticias: false } });

    res.status(200).json({ message: 'Campo actualizado con éxito en todos los usuarios' });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message || 'Algo explotó :|' });
  }
};

module.exports = {
  getUsers,
  login,
  getAuthStatus,
  editarConstraseña,
  editarConstraseñaUsuario,
  agregarUsuario,
  actualizarUser,
  borrarUsuario,
  actualizarRelevamiento,
  noticias,
  actualizarCampoNoticiasParaTodos,
  ocultarCampoNoticiasParaTodos
};
