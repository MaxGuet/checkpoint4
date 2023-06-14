const express = require("express");

const router = express.Router();

const vinyl = require("./vinyl.route");

router.use("/vinyl", vinyl);

module.exports = router;
