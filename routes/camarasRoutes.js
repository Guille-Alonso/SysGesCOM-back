const { Router } = require("express");
const { agregarCamara } = require("../controllers/camarasControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const router = Router();

router.post("/alta",[auth, verifyRole, 
    check("nombre", "el valor ingresado no es correcto").not().isEmpty().isString().isLength({ max: 7 }),
    check("ubicacion", "el valor ingresado no es correcto").not().isEmpty().isString().isLength({ min: 8, max: 30}),
    check("tipo", "el valor ingresado no es correcto").not().isEmpty().isString().isIn(["camara", "domo"]),
    validateFields
    ], agregarCamara);

module.exports = router;