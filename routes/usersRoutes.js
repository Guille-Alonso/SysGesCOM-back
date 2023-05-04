const { Router } = require("express");
const { getUsers, login, getAuthStatus, editarConstraseña, agregarUsuario } = require("../controllers/usersControllers");
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
router.put(
  "/editPassword", editarConstraseña
)

router.post("/alta",
  [
    check("userName").not().isEmpty().isLength({ min: 4, max: 20 }),
    check("name").not().isEmpty().isLength({ min: 2, max: 30 }),
    check("email", "Formato de email invalido").not().isEmpty().isEmail(),
    check("password").not().isEmpty(),
    check("grupoAltaUsuarios", "Ingrese un grupo valido").not().isEmpty().isString().isIn(["admin", "visualizador", "supervisor", "estadística", "administración"]),
    validateFields,
  ],
  agregarUsuario
)

module.exports = router;
