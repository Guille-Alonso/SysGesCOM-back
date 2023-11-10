const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarReporte, getReportes, actualizarReporte, borrarReporte, getReportesPodio, getReportesPaginacion, getReportesHistorico, getMesYTotalDeReportesVisualizadorYSupervisor, getTopTresDespachadosPorMes } = require("../controllers/reportesControllers");
const { funcionMulter } = require("../middlewares/multerStorage");
const verifyRoleEstadistica = require("../middlewares/verifyRolEstadistica");

const router = Router();

router.get("/listar/:id?", auth,getReportes);
router.get("/listarHistorico", auth,verifyRoleEstadistica,getReportesHistorico);
router.get("/listarConPaginacion", auth,verifyRoleEstadistica,getReportesPaginacion);
router.get("/podio/:turno?", auth,getReportesPodio);
router.get("/totalesVisualizadorYSupervisor", auth,getMesYTotalDeReportesVisualizadorYSupervisor);
router.get("/podioDespachosPorMes/:turno?", auth, getTopTresDespachadosPorMes);

router.use("/alta",auth,(req, res, next) => {
    // Acceder a req antes de llegar al controlador
    funcionMulter(req.user).single("photo")(req, res, () => {
      next();
    });
  })

  router.post("/alta",  [
    check("detalle", "El detalle no cumple los requisitos").not().isEmpty().isLength({min:4, max: 500 }),
    check("categoria", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("naturaleza", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("dispositivo", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    check("usuario", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
    validateFields,
  ],
  
    agregarReporte
  )

  router.use("/actualizarReporte/:id",auth,(req, res, next) => {
    // Acceder a req antes de llegar al controlador
    funcionMulter(req.user).single("photo")(req, res, () => {
      next();
    });
  })

  router.put("/actualizarReporte/:id",auth, actualizarReporte);

  router.delete(
    "/",
    [ auth,
      check("id").not().isEmpty().isMongoId(),
      validateFields,
    ],
    borrarReporte
  );

module.exports = router;