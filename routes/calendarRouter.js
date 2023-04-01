const calendarController = require("../controller/calendarController");
const express = require("express");
const router = express.Router();

router.get("/:id", calendarController.getMakeupArtistsByLocation);
router.get("/", calendarController.showAllLocation);
module.exports = router;
