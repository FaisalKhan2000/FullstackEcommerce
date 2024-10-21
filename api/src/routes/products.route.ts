import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../db/products.schema.js";
import {
  verifyRole,
  verifyToken,
} from "../middleware/authenticationMiddleware.js";
import { validateData } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(verifyToken, verifyRole(["user"]), listProducts);
router.route("/:id").get(getProductById);
router.route("/").post(validateData(createProductSchema), createProduct);
router.route("/:id").put(validateData(updateProductSchema), updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
