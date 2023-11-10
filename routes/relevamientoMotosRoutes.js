const { Router } = require("express");
const { agregarRelevamientoMotos, getRelevamientoMotos } = require("../controllers/relevamientoMotosControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const verifyStatusUserMotos = require("../middlewares/verifyStatusUserMotos");
const verifyRoleEstadistica = require("../middlewares/verifyRolEstadistica");
const router = Router();

router.post("/alta", [auth, verifyStatusUserMotos,
    check("arrayMotos", "no hay persona/s seleccionada/s").isArray(),], agregarRelevamientoMotos);

router.get("/listar", auth,verifyRoleEstadistica, getRelevamientoMotos);

module.exports = router;