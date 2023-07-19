const { Router } = require("express");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarDespacho, getDespachos, actualizarDespacho } = require("../controllers/despachosControllers");
const verifyRoleSupervisor = require("../middlewares/verifyRoleSupervisor");

const router = Router();

router.post("/alta",
[auth,verifyRoleSupervisor,
check("acuse", "El acuse no cumple los requisitos").isLength({ max: 500 }),
check("reparticiones", "Debe ser un array").not().isEmpty().isArray(),
validateFields,
],
agregarDespacho
);

router.get("/listar/:id?",auth,verifyRoleSupervisor,getDespachos);

router.put("/actualizarDespacho/:id",auth,verifyRoleSupervisor,actualizarDespacho);

module.exports = router;