const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/category-controller.js');

router.get("/", getCategories);
router.post("/add", addCategory);
router.put("/edit/:id", editCategory)
router.delete("/delete/:id", deleteCategory);

module.exports = router;
