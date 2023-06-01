const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarCategoria } = require("../controllers/categoriasControllers");

const router = Router();

router.post("/alta", [
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 20 }),
    check("naturaleza").not().isEmpty().isMongoId(),
    validateFields
], agregarCategoria);

module.exports = router;