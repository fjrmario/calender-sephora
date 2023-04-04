const Appointment = require("../model/appointmentModel");
const Location = require("../model/locationModel")
const MakeupArtist = require("../model/makeupArtistModel")
const moment = require("moment");

// const MakeupArtist = require("../model/makeupArtistModel")

const create = async (req, res) => {
  try {
    const createAppointment = await Appointment.create(req.body);
    console.log(req.body);
    const newAppointment = await createAppointment.save();
    console.log(newAppointment);
    res.status(200).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findAppointmentByDate = async (req, res) => {
  const makeupArtistId = req.params.id;
  console.log(`makeupId: ${makeupArtistId}`);
  try {
    const apptDate = moment(req.params.date).format("DD/MM/YYYY");
    console.log("Received date in server:", req.params.date);
    console.log(`apptDate: ${apptDate}`);
    const findApptByMakeupArtist = await Appointment.find({
      "makeupArtist.id": makeupArtistId,
      date: apptDate,
    });
    console.log(findApptByMakeupArtist);
    res.status(200).json(findApptByMakeupArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findAppointmentByCustomerName = async (req, res) => {
  try {
    const { customerName } = req.params;
    const currentDate = moment().startOf("day").format("DD/MM/YYYY")
    const currentTime = moment().format("HH:mm");
    
    console.log('customerName:', customerName);
    console.log('currentTime:', currentTime);
    // console.log('currentTime:', currentTime.toDate());


    const getAppointments = await Appointment.find({
      "customerInfo.name": customerName,
      date: {
        // $gte: "14/04/20203",
        $gte: currentDate,

      }})
      .sort({ date: 1 })
      .populate('location.id makeupArtist.id').sort({ date: 1, timeslot: 1 });
      res.status(200).json(getAppointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const findAppt = await Appointment.findOne({ _id: id });
    if (!findAppt) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    const deleteAppointment = await Appointment.deleteOne({
      _id: findAppt._id,
    });
    res.status(200).json(deleteAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  deleteAppointment,
  findAppointmentByDate,
  findAppointmentByCustomerName,
};