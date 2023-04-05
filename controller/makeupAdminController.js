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
    console.log(id);
  
    try {
      await Appointment.deleteMany({ "makeupArtist.id": id });
  
      // Find and delete the makeup artist
      const findMakeUpArtist = await MakeupArtist.findByIdAndDelete(id);
  
      if (!findMakeUpArtist) {
        return res.status(404).json({ error: "Makeup Artist not found" });
      }
  
      res.status(200).json({ message: "Makeup Artist deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const findMakeupArtistByLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const targetLocation = await MakeupArtist.find({ "location.id": locationId }).populate('location.id');
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

const findAppointmentByMakeupArtistId = async (req, res) => {
    try {
      const { makeupArtistId } = req.params;
      const currentDate = moment().startOf("day").format("DD/MM/YYYY")
      console.log('makeupArtistId:', makeupArtistId);
      console.log('currentDate:', currentDate);
  
      const getAppointments = await Appointment.find({
        "makeupArtist.id": makeupArtistId,
        date: {
          $gte: currentDate
        }
      })
      .sort({ date: 1 })
      .populate('location.id makeupArtist.id')
      .sort({ date: 1, timeslot: 1 });
  
      res.status(200).json(getAppointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// const showAppointmentByDate = async (req, res) => {
//     console.log("makeupArtistId")
//     const makeupArtistId = req.params.id;
//     console.log(`makeupId: ${makeupArtistId}`);
//     try {
//       const apptDate = moment(req.params.date).format("DD/MM/YYYY");
//       console.log("Received date in server:", req.params.date);
//       console.log(`apptDate: ${apptDate}`);
//       const findApptByMakeupArtist = await Appointment.find({
//         "makeupArtist.id": makeupArtistId,
//         date: apptDate,
//       });
//       console.log(findApptByMakeupArtist);
//       res.status(200).json(findApptByMakeupArtist);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
// };

module.exports ={
    create,
    deleteMakeupArtist,
    findMakeupArtistByLocation,
    updateMakeupArtist,
    findAppointmentByMakeupArtistId
}