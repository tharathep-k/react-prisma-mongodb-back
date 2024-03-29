const express = require("express");

const authController = require("../controller/auth-controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getUser);

module.exports = router;
