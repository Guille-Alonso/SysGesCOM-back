const { Router } = require("express");
const { agregarCamara, getCamara, actualizarCamara, borrarCamara } = require("../controllers/camarasControllers");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const router = Router();

router.post("/alta", [
    check("nombre", "el nombre ingresado no es correcto").not().isEmpty().isString().isLength({ max: 7 }),
    check("ubicacion", "el valor ingresado no es correcto").not().isEmpty().isString().isLength({ min: 8, max: 30 }),
    check("tipoDeCamara", "el valor ingresado no es correcto").not().isEmpty().isString().isIn(["camara", "domo"]),
    validateFields
], agregarCamara);

router.get("/listar/:nombre?", getCamara);
router.put("/actualizarCamara/:id", actualizarCamara);
router.delete(
    "/",
    [
      check("id").not().isEmpty().isMongoId(),
      validateFields,
    ],
    borrarCamara
  );

module.exports = router;