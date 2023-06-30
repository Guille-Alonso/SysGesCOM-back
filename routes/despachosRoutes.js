const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { agregarDespacho, getDespachos } = require("../controllers/despachosControllers");

const router = Router();

router.post("/alta",agregarDespacho)
router.get("/listar/:id?",getDespachos);

module.exports = router;