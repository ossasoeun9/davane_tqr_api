import { Router } from "express";
import { verifyToken } from "../controllers/auth-controller.js";
import { getProfileById, editProfile } from "../controllers/user-controller.js";

const router = Router();

router.get("/:id", getProfileById);
router.put("/edit", verifyToken, editProfile);

export default router;
