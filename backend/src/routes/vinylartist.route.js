const express = require("express");

const vinylartistRoute = express.Router();

const vinylartistController = require("../controllers/VinylArtistController");

vinylartistRoute.get("/", vinylartistController.browse);
vinylartistRoute.get("/:id", vinylartistController.read);
vinylartistRoute.put("/:id", vinylartistController.edit);
vinylartistRoute.delete("/:id", vinylartistController.destroy);
vinylartistRoute.post("/", vinylartistController.add);

module.exports = vinylartistRoute;
