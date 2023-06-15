const express = require("express");

const uservinylRoute = express.Router();

const userVinylController = require("../controllers/UserVinylController");

uservinylRoute.post("/", userVinylController.add);

module.exports = uservinylRoute;
