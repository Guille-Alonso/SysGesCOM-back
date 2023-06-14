const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarCategoria, getCategorias, borrarCategoria, actualizarCategoria } = require("../controllers/categoriasControllers");

const router = Router();

router.post("/alta", [auth,verifyRole,
  check("categoria", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 20 }),
  check("naturaleza").not().isEmpty().isMongoId(),
  validateFields
], agregarCategoria);

router.get("/listar/:nombre?",auth, getCategorias)

router.put("/actualizarCategoria/:id",auth,verifyRole, actualizarCategoria);

router.delete(
  "/",
  [ auth,verifyRole,
    check("id").not().isEmpty().isMongoId(),
    validateFields,
  ],
  borrarCategoria
);

module.exports = router;