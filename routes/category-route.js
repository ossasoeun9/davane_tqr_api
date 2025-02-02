import { Router } from "express";
const router = Router();
import {
  getCategories,
  // addCategory,
  // editCategory,
  // deleteCategory,
} from "../controllers/category-controller.js";

router.get("/", getCategories);
// router.post("/add", addCategory);
// router.put("/edit/:id", editCategory);
// router.delete("/delete/:id", deleteCategory);

export default router;
