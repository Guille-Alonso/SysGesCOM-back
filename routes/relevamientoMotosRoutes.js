const { Router } = require("express");
const { agregarRelevamientoMotos, getRelevamientoMotos } = require("../controllers/relevamientoMotosControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.post("/alta", [auth, verifyRole,
    check("arrayMotos", "no hay persona/s seleccionada/s").isArray(),], agregarRelevamientoMotos);

router.get("/listar", auth, getRelevamientoMotos);
//router.put("/confirmarCambio/:id", auth, verifyRole, confirmarCambio);

module.exports = router;