import { Router } from "express";
const router = Router();
import {
  getQrCodes,
  getQrCodeDetail,
  createQrCode,
  editQrCodeNote,
  deleteQrCode,
} from "../controllers/qr-code-controller.js";

router.get("/", getQrCodes);
router.get("/detail/:id", getQrCodeDetail);
router.post("/add", createQrCode);
router.put("/note/:id", editQrCodeNote);
router.delete("/delete/:id", deleteQrCode);

export default router;
