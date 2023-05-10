const { Router } = require("express");
const { agregarCamara, getCamara } = require("../controllers/camarasControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const router = Router();

router.post("/alta", [auth, verifyRole,
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 7 }),
    check("ubicacion", "el valor ingresado no es correcto").not().isEmpty().isString().isLength({ min: 8, max: 30 }),
    check("tipoDeCamara", "el valor ingresado no es correcto").not().isEmpty().isString().isIn(["camara", "domo"]),
    validateFields
], agregarCamara);

router.get("/listar/:nomlbre?", getCamara);

module.exports = router;