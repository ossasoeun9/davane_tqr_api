import { Router } from "express";
import { getImage } from "../controllers/image-controller.js";
const router = Router();

router.get("/products/:path", getImage)
router.get("/users/:path", getImage)
router.get("/suppliers/:path", getImage)
router.get("/store/:path", getImage)

export default router