const express = require("express");
const router = express.Router();
const {
  getIngredients,
  addIngredient,
  editIngredient,
  deleteIngredient,
} = require('../controllers/ingredient-controller.js');

router.get("/", getIngredients);
router.post("/add", addIngredient);
router.put("/edit/:id", editIngredient)
router.delete("/delete/:id", deleteIngredient);

module.exports = router;
