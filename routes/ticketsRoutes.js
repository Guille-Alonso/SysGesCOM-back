const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarTicket, borrarTicket, getTickets, actualizarTicket } = require("../controllers/ticketsControllers");
const { funcionMulterTicket } = require("../middlewares/multerTicketStorage");

const router = Router();
router.use("/alta", auth, (req, res, next) => {
  // Acceder a req antes de llegar al controlador
  funcionMulterTicket(req.user).single("photo")(req, res, () => {
    next();
  });
})

router.post("/alta", [
  check("descripcion", "El detalle no cumple los requisitos").not().isEmpty().isLength({ min: 4, max: 500 }),
  check("titulo", "El Titulo no cumple los requisitos").not().isEmpty().isLength({ min: 4, max: 200 }),
  check("usuario", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),
  // check("dispositivo", "Debe ser un id de mongodb").not().isEmpty().isMongoId(),//ver
  validateFields,
],

  agregarTicket
)
router.get("/listar/:id?", auth, verifyRole, getTickets)
router.delete(
  "/borrar",
  [auth, verifyRole,
    check("id").not().isEmpty().isMongoId(),
    validateFields,
  ],
  borrarTicket
);


router.use("/actualizarTicket/:id", auth, (req, res, next) => {
  // Acceder a req antes de llegar al controlador
  funcionMulterTicket(req.user).single("photo")(req, res, () => {
    next();
  });
})

router.put("/actualizarTicket/:id", auth, actualizarTicket);


module.exports = router;