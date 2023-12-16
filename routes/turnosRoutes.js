const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarTurno, actualizarCampoTurnoParaTodos, getTurnos } = require("../controllers/turnosControllers");

const router = Router();

router.post("/alta", agregarTurno);

router.get("/listar",auth, getTurnos)
router.put("/editarTurno",actualizarCampoTurnoParaTodos)

module.exports = router;