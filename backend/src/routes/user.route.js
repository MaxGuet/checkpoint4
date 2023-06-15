const express = require("express");
const auth = require("../utils/Auth");

const userRoute = express.Router();

const userController = require("../controllers/UserController");

userRoute.get("/", userController.browse);
userRoute.get("/:id", userController.read);
userRoute.post("/", userController.add);
userRoute.post("/login", userController.login, auth.verifyPassword);

module.exports = userRoute;
