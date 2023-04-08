const adminController = require("../controller/adminController");
const express = require("express");
const router = express.Router();

router.post("/signup", adminController.create);
router.post("/login", adminController.login)
router.post("/reset", adminController.resetPassword)

module.exports = router;
