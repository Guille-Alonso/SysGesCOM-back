const User = require("../models/User");

const verifyRoleAdministracion = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (user.tipoDeUsuario == "administración" || user.tipoDeUsuario == "admin") {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyRoleAdministracion;