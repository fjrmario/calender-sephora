const MakeupArtist = require("../model/makeupArtistModel");
const Location = require('../model/locationModel');
const mongoose = require('mongoose');

const showAllLocation = async (req, res) => {
  try {
   
    const foundLocation = await Location.find({}).sort({type: 1}).exec();

    res.status(200).json(foundLocation);
  } catch (error) {
    console.log(`Error showing queueno: ${error}`);
    res.status(400).json({ error: error.message });
  }
};

const getMakeupArtistsByLocation = async (req, res) => {
  const locationId = req.params.id;
  console.log(`locationId: ${locationId}`);

  try {
    const objectId = new mongoose.Types.ObjectId(locationId);
    console.log(`objectId: ${objectId}`);
    const allArtist = await MakeupArtist.find({ "location.id": objectId }).select('name');
    console.log(`allArtist: ${allArtist}`);
    res.status(200).json(allArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showLocationById = async(req, res) => {
  const locationId = req.params.id;

  try{
    const checkLocation = await Location.findById(locationId);
    res.status(200).json(checkLocation);
  }catch (error){
    res.status(400).json({error:error.message});
  }
}

module.exports = {
  getMakeupArtistsByLocation,
  showAllLocation,
  showLocationById
};
