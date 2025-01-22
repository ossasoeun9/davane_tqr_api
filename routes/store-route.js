const express = require("express");
const { createStore, getStoreById, editStore } = require("../controllers/store-controller.js");
const { verifyToken } = require("../controllers/auth-controller.js");

const router = express.Router();

router.post("/create", verifyToken, createStore);
router.get("/:id", getStoreById);
router.put("/edit", verifyToken , editStore);

module.exports = router;