const customerController = require("../controller/customerController");
const express = require("express");
const router = express.Router();
// const {isLoggedIn} = require("..")

router.post("/signup", customerController.create);
router.post("/login", customerController.login)

module.exports = router;
