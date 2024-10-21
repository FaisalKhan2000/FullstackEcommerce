import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products.controller";
import {
  createProductSchema,
  updateProductSchema,
} from "../db/products.schema";
import { validateData } from "../middleware/validationMiddleware";

const router = Router();

router.route("/").get(listProducts);
router.route("/:id").get(getProductById);
router.route("/").post(validateData(createProductSchema), createProduct);
router.route("/:id").put(validateData(updateProductSchema), updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
