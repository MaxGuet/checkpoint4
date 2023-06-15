const express = require("express");

const genreRoute = express.Router();

const genreController = require("../controllers/GenreController");

genreRoute.get("/", genreController.browse);
genreRoute.get("/:id", genreController.read);
genreRoute.put("/:id", genreController.edit);
genreRoute.delete("/:id", genreController.destroy);
genreRoute.post("/", genreController.add);

module.exports = genreRoute;
