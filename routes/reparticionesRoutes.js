const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { getReparticiones, agregarReparticion } = require("../controllers/reparticionesControllers");

const router = Router();

router.post("/alta",auth,verifyRole,agregarReparticion)
router.get("/listar/:id?", auth,getReparticiones);

module.exports = router;