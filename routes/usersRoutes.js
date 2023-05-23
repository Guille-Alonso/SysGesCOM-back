const { Router } = require("express");
const { getUsers, login, getAuthStatus, editarConstraseña, agregarUsuario, actualizarUser } = require("../controllers/usersControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const validateFields = require("../middlewares/validateFields");
const { check } = require("express-validator");

const router = Router();

router.get("/email/:email?", getUsers)
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
router.put("/actualizarUsuario/:id", actualizarUser);

router.post("/alta",
  [
    check("userName", "El usuario no cumple los requisitos").not().isEmpty().isLength({ min: 4, max: 20 }),
    check("name", "El nombre no cumple los requisitos").not().isEmpty().isLength({ min: 2, max: 30 }),
    check("dni", "El dni debe ser numérico").not().isEmpty().isLength({ max: 8 }),
    check("fechaNac", "La fecha debe ser Ingresada").not().isEmpty(),
    check("numAfil", "El afiliado no cumple los requisitos").not().isEmpty().isLength({ max: 5 }),
    check("email", "Formato de email invalido").not().isEmpty().isEmail(),
    check("password", "La contraseña no cumple los requisitos").not().isEmpty(),
    check("perfilAltaUsuarios", "Debe ingresar un grupo valido").not().isEmpty().isString().isIn(["admin", "visualizador", "supervisor", "estadística", "administración"]),
    check("turno", "Debe ingresar un turno valido").not().isEmpty().isString().isIn(["mañana", "tarde", "noche"]),
    validateFields,
  ],
  agregarUsuario
)

module.exports = router;
