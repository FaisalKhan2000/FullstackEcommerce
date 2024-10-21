import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products.controller";
const router = Router();

router.route("/").get(listProducts);
router.route("/:id").get(getProductById);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
