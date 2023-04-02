const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

router.get('/', locationController.getLocations);
router.post('/', locationController.enterLocations)

module.exports = router;