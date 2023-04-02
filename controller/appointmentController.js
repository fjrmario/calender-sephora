const Appointment = require("../model/appointmentModel");
const moment = require('moment');
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

const findAppointment = async (req, res) => {
  const makeupArtistId = req.params.id;
  const apptDate = moment(req.params.date).format("DD/MM/YYYY");
  console.log(`makeupId: ${makeupArtistId}`);
  console.log(`apptDate: ${apptDate}`);
  try{
    const findApptByMakeupArtist = await Appointment.find({ 
      "makeupArtist.id": makeupArtistId,
      date: apptDate,  
    });
    console.log(findApptByMakeupArtist);
    res.status(200).json(findApptByMakeupArtist);
  }catch (error) {
    res.status(400).json({error: error.message});
  
  }
}

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
    findAppointment
  };