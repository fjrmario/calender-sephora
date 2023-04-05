const calendarController = require("../controller/calendarController");
const express = require("express");
const {isAuth} = require("../controller/customerAuthController")
const router = express.Router();

router.get("/:id", isAuth,  calendarController.getMakeupArtistsByLocation);
router.get("/", isAuth,  calendarController.showAllLocation);
module.exports = router;
