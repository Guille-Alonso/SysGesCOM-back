const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarNaturalezaEvento, getNaturaleza } = require("../controllers/NaturalezaEventoControllers");

const router = Router();

router.post("/alta", [ auth,verifyRole,
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 20 }),
    validateFields
], agregarNaturalezaEvento);

router.get("/listar/:nombre?",auth, getNaturaleza)

module.exports = router;