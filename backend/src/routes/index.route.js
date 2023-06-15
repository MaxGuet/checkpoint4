const express = require("express");

const router = express.Router();

const vinyl = require("./vinyl.route");
const artist = require("./artist.route");
const user = require("./user.route");
const vinylartist = require("./vinylartist.route");
const genre = require("./genre.route");
const UserVinylRoute = require("./uservinyl.route");

router.use("/vinyl", vinyl);
router.use("/artist", artist);
router.use("/user", user);
router.use("/vinyl_artist", vinylartist);
router.use("/genre", genre);
router.use("/uservinyl", UserVinylRoute);
module.exports = router;
