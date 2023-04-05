const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');
const {isAuth} = require("../controller/customerAuthController")


router.get('/',isAuth, locationController.getLocations);
router.post('/',isAuth,locationController.enterLocations)
router.put('/', isAuth, locationController.updateLocation)

module.exports = router;