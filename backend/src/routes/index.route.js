const express = require("express");

const router = express.Router();

const vinyl = require("./vinyl.route");
const artist = require("./artist.route");
const user = require("./user.route");
const vinylartist = require("./vinylartist.route");

router.use("/vinyl", vinyl);
router.use("/artist", artist);
router.use("/user", user);
router.use("/vinyl_artist", vinylartist);
module.exports = router;
