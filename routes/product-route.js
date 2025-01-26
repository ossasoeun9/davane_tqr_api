import { Router } from "express";
const router = Router();
import {
  getProducts,
  getProductDetail,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product-controller.js";

router.get("/", getProducts);
router.get("/detail/:id", getProductDetail);
router.post("/add", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
