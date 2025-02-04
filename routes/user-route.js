import { Router } from "express";
import { verifyToken } from "../controllers/auth-controller.js";
import { getProfile, editProfile } from "../controllers/user-controller.js";

const router = Router();

router.get("/", verifyToken, getProfile);
router.put("/edit", verifyToken, editProfile);

export default router;
