const User = require("../models/User");

const verifyRoleSupervEstad = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (user.tipoDeUsuario == "estadística" || user.tipoDeUsuario == "admin" || user.tipoDeUsuario == "supervisor") {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyRoleSupervEstad;