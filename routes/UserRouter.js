const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController.js");
const db = require("../model");

router.get("/:id", UserController.show);
router.get("/", UserController.index);


module.exports = router;
