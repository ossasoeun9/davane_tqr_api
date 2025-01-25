const express = require("express");
const {
  getSuppliers,
  createSupplier,
  editSupplier,
  deleteSupplier
} = require("../controllers/supplier-controller.js");

const router = express.Router();

router.get("/", getSuppliers);
router.post("/add", createSupplier);
router.put("/edit/:id", editSupplier);
router.delete("/delete/:id", deleteSupplier);

module.exports = router;