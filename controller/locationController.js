const Location = require('../model/locationModel');

const getLocations = (req, res) => {
    Location.find({})
      .then(locations => {
        res.json(locations);
    })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving locations from database.' });
    });
}

const enterLocations = async (req, res) =>{
    const {name, latitude, longitude} = req.body;

    try{
        const location = new Location({ name, latitude, longitude});
        await location.save();
        res.status(201).json(location);
    }

    catch(error){
        console.log(error);
        res.status(500).json({message: "server error"})
    }
}

module.exports = { getLocations,
enterLocations };