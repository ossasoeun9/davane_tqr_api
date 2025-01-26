import { Router } from "express";
import {
  createStore,
  getStore,
  editStore,
} from "../controllers/store-controller.js";
import {
  getCertificates,
  createCertificate,
  editCertificate,
  deleteCertificate,
} from "../controllers/certificate-controller.js";

const router = Router();

router.post("/create", createStore);
router.get("/", getStore);
router.put("/edit", editStore);

router.get("/certificate/list", getCertificates);
router.post("/certificate/create", createCertificate);
router.put("/certificate/edit/:id", editCertificate);
router.delete("/certificate/delete/:id", deleteCertificate);

export default router;
