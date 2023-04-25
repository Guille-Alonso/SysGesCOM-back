const User = require("../models/User");
const CustomError = require("../utils/customError");

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

module.exports = {
  getUsers
};
