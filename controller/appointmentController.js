const Appointment = require("../model/appointmentModel");
const MakeupArtist = require("../model/makeupArtistModel")

  const create = async (req, res) => {
    const { name, email, location, artist, date, timeslot } = req.body;
  
    try {
      // Find the MakeupArtist by the selected artist name
      const makeupArtist = await MakeupArtist.findOne({ name: artist });
  
      if (!makeupArtist) {
        return res.status(404).json({ error: "Makeup artist not found" });
      }
  
      // Check if the email already exists in the timeslot array for the selected timeslot
      const selectedTimeslot = makeupArtist.timeslot.find(
        (ts) => ts.time === timeslot && ts.date === date
      );
      if (selectedTimeslot && selectedTimeslot.bookings.includes(email)) {
        return res
          .status(400)
          .json({ error: "Email already booked for this timeslot" });
      }
  
      const createAppointment = await Appointment.create({
        customerName: name,
        location: location,
        makeupArtist: artist,
        customerInfo: {
          name: name,
          email: email,
        },
        date: date,
        timeslot: timeslot,
      });
  
      // Push the email to the timeslot array of the MakeupArtist for the selected timeslot
      if (selectedTimeslot) {
        selectedTimeslot.bookings.push(email);
      } else {
        makeupArtist.timeslot.push({ time: timeslot, date: date, bookings: [email] });
      }
  
      await makeupArtist.save();
  
      res.status(200).json(createAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteAppointment = async (req, res) => {
    const {id} = req.params
    try {
      const findAppt = await Appointment.findOne({_id: id });
      if (!findAppt) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      const deleteAppointment = await Appointment.deleteOne({_id: findAppt._id})
      res.status(200).json(deleteAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    create,
    deleteAppointment,
  };