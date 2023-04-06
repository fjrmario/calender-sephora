const appointmentController = require("../controller/appointmentController");
// const {isAuth} = require("../controller/customerAuthController")
const express = require("express");
const router = express.Router();

router.delete("/:id", appointmentController.deleteAppointment);
router.post("/:customerName/:date",  appointmentController.createAppointmentWithLimit)
router.get("/:id/:date", appointmentController.findAppointmentByDate);
router.get("/:customerName",  appointmentController.findAppointmentByCustomerName);

module.exports = router;