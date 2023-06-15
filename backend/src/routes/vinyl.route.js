const express = require("express");
const multer = require("multer");
const path = require("path");

const uploadFolder = path.join(__dirname, "../../public/assets/images");

const upload = multer({ dest: uploadFolder });

const vinylRoute = express.Router();

const VinylController = require("../controllers/VinylController");

vinylRoute.get("/", VinylController.browse);
vinylRoute.get("/:id", VinylController.read);
vinylRoute.get("/user/:user", VinylController.findByArtist);
vinylRoute.put("/:id", VinylController.edit);
vinylRoute.delete("/:id", VinylController.destroy);
vinylRoute.post("/", upload.single("cover"), VinylController.add);

module.exports = vinylRoute;
