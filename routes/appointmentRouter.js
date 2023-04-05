const appointmentController = require("../controller/appointmentController");
const {isAuth} = require("../controller/customerAuthController")
const express = require("express");
const router = express.Router();

router.delete("/:id", isAuth,  appointmentController.deleteAppointment);
router.post("/", isAuth,  appointmentController.create)
router.get("/:id/:date", isAuth,   appointmentController.findAppointmentByDate);
router.get("/:customerName", isAuth,  appointmentController.findAppointmentByCustomerName);

module.exports = router;