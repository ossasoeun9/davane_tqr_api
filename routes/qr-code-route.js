import { Router } from "express";
const router = Router();
import {
  getQrCodes,
  getQrCodeDetail,
  createQrCode,
  editQrCodeNote,
  deleteQrCode,
} from "../controllers/qr-code-controller.js";
import { verifyToken2 } from "../controllers/auth-controller.js";

router.get("/", verifyToken2, getQrCodes);
router.get("/detail/:id", getQrCodeDetail);
router.post("/add", verifyToken2, createQrCode);
router.put("/note/:id", verifyToken2, editQrCodeNote);
router.delete("/delete/:id", verifyToken2, deleteQrCode);

export default router;
