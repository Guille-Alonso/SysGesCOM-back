const { Router } = require("express");
const { agregarPedidoCambio, getCambios, confirmarCambio, getCambiosVisualizador, deletePedidoCambio } = require("../controllers/cambiosTurnoControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.post("/alta", [auth,
    // check("pedido", "no hay fecha ingresada").not().isEmpty().isString(),

], agregarPedidoCambio);

router.get("/listar", auth, getCambios);
router.get("/listarCambiosVisualizador", auth, getCambiosVisualizador);
router.put("/confirmarCambio/:id", auth, confirmarCambio);
router.delete("/",auth,deletePedidoCambio)

module.exports = router;