const User = require("../models/User");

const verifyRoleSupervEstad = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id).populate("turno").populate("tipoDeUsuario");
    if (user.tipoDeUsuario.nombre == "estadística" || user.tipoDeUsuario.nombre == "admin" || user.tipoDeUsuario.nombre == "supervisor") {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyRoleSupervEstad;