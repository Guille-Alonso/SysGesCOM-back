
const verifyStatusUserMotos = async (req, res, next) => {
  try {
    if (req.user.relevamientoHabilitado) {
      next();
    } else {
      throw new Error("Usted no está autorizado");
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = verifyStatusUserMotos;