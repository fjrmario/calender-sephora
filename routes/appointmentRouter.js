const appointmentController = require("../controller/appointmentController");
const express = require("express");
const router = express.Router();

router.delete("/:id", appointmentController.deleteAppointment);
router.post("/", appointmentController.create)
router.get("/:id/:date", appointmentController.findAppointmentByDate);
router.get("/:customerName", appointmentController.findAppointmentByCustomerName);

module.exports = router;