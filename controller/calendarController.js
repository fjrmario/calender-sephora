const MakeupArtist = require("../model/makeupArtistModel");
const Location = require('../model/locationModel');

const index = (req, res) => {
  res.send("ok");
};

const getMakeupArtistsByLocation = async (req, res) => {
  const { location } = req.params.id;
  console.log(`location: ${location}`);

  try {
    const allArtist = await Location.findById({ name: location}).populate({
      path: 'makeupArtists',
      model: MakeupArtist,
      select: 'name'
    })
    console.log(`allArtist: ${allArtist}`);
    res.status(200).json(allArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMakeupArtistsByLocation,
  index
};
