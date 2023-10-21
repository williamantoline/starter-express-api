const express = require("express");
const router = express.Router();
const RecipeController = require("../controller/RecipeController.js");


router.get("/", RecipeController.index);
router.get("/:id", RecipeController.show);


module.exports = router;
