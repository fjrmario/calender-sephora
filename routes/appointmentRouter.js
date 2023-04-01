const appointmentController = require("../controller/appointmentController");
const express = require("express");
const router = express.Router();

router.delete("/:id", appointmentController.deleteAppointment);
router.post("/", appointmentController.create)

module.exports = router;
