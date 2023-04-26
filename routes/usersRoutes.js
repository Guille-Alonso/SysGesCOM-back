const { Router } = require("express");
const { getUsers, login, getAuthStatus } = require("../controllers/usersControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const validateFields = require("../middlewares/validateFields");
const { check } = require("express-validator");

const router = Router();

router.get("/email/:email?", verifyRole, getUsers)
router.get("/authStatus", auth, getAuthStatus);
router.post(
    "/login",
    [
      check("nombreUsuario").not().isEmpty().isLength({ max: 15 }),
      check("contraseña").isLength({ min: 6, max: 30 }),
      validateFields,
    ],
    login
  );

module.exports = router;
