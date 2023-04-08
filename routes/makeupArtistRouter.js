const express = require("express");
const router = express.Router();
const makeupArtist = require("../controller/makeupAdminController");
const {adminAuth, requireRole} = require("../controller/adminAuthController");

// router.get("/edit/:id", makeupArtist.show)
// router.post("/", makeupArtist.create);
// router.get("/:locationId", makeupArtist.findMakeupArtistByLocation);
// router.get("/admin/:makeupArtistId", makeupArtist.findAppointmentByMakeupArtistId);
// router.put("/:makeupArtistId", makeupArtist.updateMakeupArtist);
// router.delete("/:id", makeupArtist.deleteMakeupArtist)

router.get("/edit/:id", adminAuth, requireRole(['PAdmin']), makeupArtist.show)
router.post("/", adminAuth, requireRole(['PAdmin']), makeupArtist.create);
router.get("/:locationId", adminAuth, requireRole(['PAdmin']), makeupArtist.findMakeupArtistByLocation);
router.get("/admin/:makeupArtistId", adminAuth, requireRole(['PAdmin']), makeupArtist.findAppointmentByMakeupArtistId);
router.put("/:makeupArtistId", adminAuth, requireRole(['PAdmin']), makeupArtist.updateMakeupArtist);
router.delete("/:id", adminAuth, requireRole(['PAdmin']), makeupArtist.deleteMakeupArtist)

module.exports = router;
