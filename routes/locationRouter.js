const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

router.get('/', locationController.getLocations);
router.post('/', locationController.enterLocations)
router.put('/', locationController.updateLocation)

module.exports = router;