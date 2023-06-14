const express = require("express");

const artistRoute = express.Router();

const artistController = require("../controllers/ArtistController");

artistRoute.get("/", artistController.browse);
artistRoute.get("/:id", artistController.read);
artistRoute.put("/:id", artistController.edit);
artistRoute.delete("/:id", artistController.destroy);
artistRoute.post("/", artistController.add);

module.exports = artistRoute;
