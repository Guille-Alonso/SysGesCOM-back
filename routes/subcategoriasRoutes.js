const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarSubcategoria, getSubcategorias, borrarSubcategoria, actualizarSubcategoria } = require("../controllers/subcategoriasControllers");
const verifyRoleEstadistica = require("../middlewares/verifyRolEstadistica");

const router = Router();

router.post("/alta", [auth,verifyRoleEstadistica,
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 60 }),
    check("categoria").not().isEmpty().isMongoId(),
    validateFields
], agregarSubcategoria);

router.get("/listar/:idCat?",auth, getSubcategorias)
// router.get("/listarConCat",auth, getSubConCat)

router.put("/actualizarSubcategoria/:id",auth,verifyRoleEstadistica, actualizarSubcategoria);

router.delete(
    "/",
    [ auth,verifyRole,
      check("id").not().isEmpty().isMongoId(),
      validateFields,
    ],
    borrarSubcategoria
  );

module.exports = router;