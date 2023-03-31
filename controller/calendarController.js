const MakeUpArtist = require("../model/makeupArtistiModel");


const show = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    res.status(200).send(holiday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  show,
};
