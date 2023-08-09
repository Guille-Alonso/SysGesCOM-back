const { Router } = require("express");
const { agregarPedidoCambio, getCambios, confirmarCambio } = require("../controllers/cambiosTurnoControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.post("/alta", [auth, verifyRole,
    // check("pedido", "no hay fecha ingresada").not().isEmpty().isString(),

], agregarPedidoCambio);

router.get("/listar", auth, getCambios);
router.put("/confirmarCambio/:id", auth, verifyRole, confirmarCambio);

module.exports = router;