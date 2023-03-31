const appointmentController = require("../controller/appointmentController");
const express = require("express");
const router = express.Router();

router.delete("/:_id", appointmentController.deleteAppointment);
router.post("/", appointmentController.create)

module.exports = router;
