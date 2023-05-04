const User = require("../models/User");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    if (req.params.email) {
      const user = await User.findOne({ email: req.params.email });
      if (!user) throw new CustomError("Usuario no encontrado", 404);
      res.status(200).json({ user });
    } else {
      const users = await User.find();
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
    const { password, confirmPassword, confirmPasswordRepeat, idUsuario } = req.body;
    const Usuario = await User.findById(idUsuario);
    const bcrypt = require("bcryptjs");
    const passOk = await bcrypt.compare(password, Usuario.contraseña);
    if (passOk) {
      if (confirmPassword === confirmPasswordRepeat) {
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(confirmPassword, salt);
        await User.findByIdAndUpdate(idUsuario, { contraseña: passwordEncrypted })
      }
      res.status(200).json({ mensaje: "Contraseña modificada con exito" })
    }
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
    const { userName, name, email, password, perfilAltaUsuarios, repeatPassword } = req.body;
    if (password !== repeatPassword)
      throw new CustomError("Las contraseñas no coinciden", 400);
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = new User({
      nombreUsuario: userName,
      nombre: name,
      email,
      tipoDeUsuario: perfilAltaUsuarios.toLowerCase(),
      contraseña: passwordEncrypted,
    });
    await user.save();
    res.status(200).json({ message: "Usuario creado con exito" });
  } catch (error) {
      res
        .status(error.code || 500)
        .json({ message: error.message || "algo explotó :(" });
    }
}

module.exports = {
  getUsers,
  login,
  getAuthStatus,
  editarConstraseña,
  agregarUsuario
};
