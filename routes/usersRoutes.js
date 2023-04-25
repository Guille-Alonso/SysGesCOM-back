const { Router } = require("express");
const { getUsers } = require("../controllers/usersControllers");
const verifyRole = require("../middlewares/verifyRole");

const router = Router();

router.get("/:email?", verifyRole, getUsers)

module.exports = router;
