const Appointment = require("../model/appointmentModel");

const create = async (req, res) => {
    try {
      const createAppointment = await Appointment.create(req.body);
      res.status(200).send(createAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteHoliday = async (req, res) => {
    try {
      const deleteAppointment = await Appointment.findByIdAndRemove(req.params.id);
      res.status(200).send(deleteAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    create,
    delete: deleteHoliday,

  };