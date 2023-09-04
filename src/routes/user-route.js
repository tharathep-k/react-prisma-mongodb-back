const express = require("express");

const userController = require("../controller/user-controller");

const router = express.Router();

router.get("/getuserdata/", userController.getUserdata);
router.delete("/deleteuser/", userController.deleteUser);

module.exports = router;
