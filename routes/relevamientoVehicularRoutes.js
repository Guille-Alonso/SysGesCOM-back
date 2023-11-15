const { Router } = require("express");
const { agregarVehiculo, getVehiculos } = require("../controllers/vehiculosControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const verifyStatusUserMotos = require("../middlewares/verifyStatusUserMotos");
const verifyRoleEstadistica = require("../middlewares/verifyRolEstadistica");
const router = Router();

router.post("/alta", auth, agregarVehiculo);

router.get("/listar", auth, verifyRoleEstadistica, getVehiculos);

module.exports = router;