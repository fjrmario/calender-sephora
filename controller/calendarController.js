const MakeUpArtist = require("../model/makeupArtistiModel");

const create = async (req, res) => {
  try {
    const createdHoliday = await Holiday.create(req.body);
    res.status(200).send(createdHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const seed = async (req, res) => {
  try {
    await Holiday.deleteMany({});

    const holidays = await Holiday.create([
      { name: "World Kindness" },
      { name: "Spicy Hermit Cookie" },
      { name: "Lost Sock Memorial" },
      { name: "Bathtub Party" },
      { name: "Zipper" },
      { name: "Test Delete Route" },
    ]);
    res.status(200).json(holidays);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const foundHolidays = await Holiday.find({});
    res.status(200).send(foundHolidays);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    const deletedHoliday = await Holiday.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    res.status(200).send(holiday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedHoliday = await Holiday.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedHoliday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  seed,
  index,
  delete: deleteHoliday,
  show,
  update,
};
