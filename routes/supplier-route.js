import { Router } from "express";
import {
  getSuppliers,
  createSupplier,
  editSupplier,
  deleteSupplier,
  getSupplierDetail,
} from "../controllers/supplier-controller.js";

const router = Router();

router.get("/", getSuppliers);
router.post("/add", createSupplier);
router.get("/detail/:id", getSupplierDetail);
router.put("/edit/:id", editSupplier);
router.delete("/delete/:id", deleteSupplier);

export default router;
