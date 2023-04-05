const Appointment = require("../model/appointmentModel");
const Location = require("../model/locationModel")
const MakeupArtist = require("../model/makeupArtistModel")
const moment = require("moment");


const create = async (req, res) => {
  try {
    const createMakeupArtist = await MakeupArtist.create(req.body);
    console.log(req.body);
    const newMakeupArtist = await createMakeupArtist.save();
    console.log(newMakeupArtist);
    res.status(200).json(newMakeupArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMakeupArtist = async (req, res) => {
    const { id } = req.params;
    try {
      const findMakeupArtist = await MakeupArtist.findOne({ _id: id });
      if (!findMakeupArtist ) {
        return res.status(404).json({ error: "Makeup Artist not found" });
      }
      const deleteMakeupArtist = await MakeupArtist.deleteOne({
        _id: findMakeupArtist ._id,
      });
      res.status(200).json(deleteMakeupArtist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const findMakeupArtistByLocation = async (req, res) => {
    try {
      const { locationName } = req.params;
      const targetLocation = await MakeupArtist.find({ "location._id": locationName }).populate('location._id');
        res.status(200).json(targetLocation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const updateMakeupArtist = async (req, res) => {
    const { id } = req.params;
  
    try {
      const makeupArtistBody = req.body;
      const makeupArtist = await MakeupArtist.findOneAndUpdate(
        { id: id },
        makeupArtistBody,
        { new: true } 
      );
      res.status(200).json(makeupArtistBody);
    }  catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const showAppointmentByDate = async (req, res) => {
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

module.exports ={
    create,
    deleteMakeupArtist,
    findMakeupArtistByLocation,
    updateMakeupArtist,
    showAppointmentByDate
}