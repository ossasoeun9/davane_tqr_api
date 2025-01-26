import { Router } from "express";
const router = Router();
import {
  getIngredients,
  addIngredient,
  editIngredient,
  deleteIngredient,
} from "../controllers/ingredient-controller.js";

router.get("/", getIngredients);
router.post("/add", addIngredient);
router.put("/edit/:id", editIngredient);
router.delete("/delete/:id", deleteIngredient);

export default router;
