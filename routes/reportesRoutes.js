const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarReporte, getReportes } = require("../controllers/reportesControllers");
const { funcionMulter } = require("../middlewares/multerStorage");

const router = Router();

router.get("/listar/:id?", getReportes);

router.use("/alta",auth,(req, res, next) => {
    // Acceder a req antes de llegar al controlador
    funcionMulter(req.user).single("photo")(req, res, () => {
      next();
    });
  })

  router.post("/alta",  [
    check("detalle", "El detalle no cumple los requisitos").not().isEmpty().isLength({ min: 4, max: 50 }),
    check("categoria", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("naturaleza", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("dispositivo", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("usuario", "Debe ser un id de mongodb").not().isObject(),
    validateFields,
  ],
  
    agregarReporte
  )

module.exports = router;