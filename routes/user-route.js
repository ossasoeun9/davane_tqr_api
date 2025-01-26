import { Router } from "express";
import { verifyToken } from "../controllers/auth-controller.js";
import { getProfile, editProfile } from "../controllers/user-controller.js";

const router = Router();

router.get("/", getProfile);
router.put("/edit", editProfile);

export default router;
