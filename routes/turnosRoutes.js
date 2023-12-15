const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarTurno, actualizarCampoTurnoParaTodos } = require("../controllers/turnosControllers");

const router = Router();

router.post("/alta", agregarTurno);

// router.get("/listar/:nombre?",auth, getNaturaleza)
router.put("/editarTurno",actualizarCampoTurnoParaTodos)

module.exports = router;