const { Router } = require("express");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarDespacho, getDespachos } = require("../controllers/despachosControllers");
const verifyRoleSupervisor = require("../middlewares/verifyRoleSupervisor");

const router = Router();

router.post("/alta",auth,verifyRoleSupervisor,agregarDespacho)
router.get("/listar/:id?",auth,verifyRoleSupervisor,getDespachos);

module.exports = router;