const { Router } = require("express");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const { funcionMulter } = require("../middlewares/multerFileStorage");
const { agregarNoticia, obtenerArchivosDeUnaNoticia, obtenerNoticias, borrarNoticias } = require("../controllers/noticiasControllers");
const validateFields = require("../middlewares/validateFields");
const verifyRoleAdministracion = require("../middlewares/verifyRolAdministracion");
const router = Router();

router.get("/listar/:id?", auth,obtenerArchivosDeUnaNoticia);
router.get("/listarNoticias", auth,obtenerNoticias);

router.use("/alta",auth,verifyRoleAdministracion,(req, res, next) => {
    // Acceder a req antes de llegar al controlador
    funcionMulter(req.user).array("files",4)(req, res, () => {
      next();
    });
  })

router.post("/alta",auth, agregarNoticia);

router.delete(
  "/",
  [ auth,verifyRoleAdministracion,
    check("id").not().isEmpty().isMongoId(),
    validateFields,
  ],
  borrarNoticias
);

module.exports = router;