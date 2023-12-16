const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarRol, actualizarCampoRolParaTodos, getRoles } = require("../controllers/rolesControllers");

const router = Router();

router.post("/alta", agregarRol);

router.get("/listar",auth, getRoles)
router.put("/editarRol",actualizarCampoRolParaTodos)

module.exports = router;