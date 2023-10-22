const express = require("express");
const router = express.Router();
const RecipeController = require("../controller/RecipeController.js");


router.get("/", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("/", RecipeController.store);
router.put("/:id", RecipeController.update);
router.delete("/:id", RecipeController.destroy);


module.exports = router;
