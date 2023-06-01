const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarSubcategoria, getSubcategorias } = require("../controllers/subcategoriasControllers");

const router = Router();

router.post("/alta", [
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 20 }),
    check("categoria").not().isEmpty().isMongoId(),
    validateFields
], agregarSubcategoria);

router.get("/listar/:nombre?", getSubcategorias)

module.exports = router;