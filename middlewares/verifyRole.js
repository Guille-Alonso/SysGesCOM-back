const User = require("../models/User");

const verifyRole = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id).populate("turno").populate("tipoDeUsuario");
    if (user.tipoDeUsuario.nombre == "admin") {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyRole;