const express = require("express");
const { createStore, getStoreById, editStore } = require("../controllers/store-controller.js");
const { verifyToken, verifyToken2 } = require("../controllers/auth-controller.js");
const { getCertificates ,createCertificate, editCertificate, deleteCertificate } = require("../controllers/certificate-controller.js");

const router = express.Router();

router.post("/create", verifyToken, createStore);
router.get("/:id", getStoreById);
router.put("/edit", verifyToken2 , editStore);

router.get("/certificate/list", verifyToken2, getCertificates)
router.post("/certificate/create", verifyToken2, createCertificate)
router.put("/certificate/edit/:id", verifyToken2, editCertificate)
router.delete("/certificate/delete/:id", verifyToken2, deleteCertificate)

module.exports = router;