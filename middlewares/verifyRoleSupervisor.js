const User = require("../models/User");

const verifyRoleSupervisor = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (user.tipoDeUsuario == "supervisor" || user.tipoDeUsuario == "admin") {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyRoleSupervisor;