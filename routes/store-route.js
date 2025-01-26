import { Router } from "express";
import {
  createStore,
  getStoreById,
  editStore,
} from "../controllers/store-controller.js";
import { verifyToken, verifyToken2 } from "../controllers/auth-controller.js";
import {
  getCertificates,
  createCertificate,
  editCertificate,
  deleteCertificate,
} from "../controllers/certificate-controller.js";

const router = Router();

router.post("/create", verifyToken, createStore);
router.get("/:id", getStoreById);
router.put("/edit", verifyToken2, editStore);

router.get("/certificate/list", verifyToken2, getCertificates);
router.post("/certificate/create", verifyToken2, createCertificate);
router.put("/certificate/edit/:id", verifyToken2, editCertificate);
router.delete("/certificate/delete/:id", verifyToken2, deleteCertificate);

export default router;
