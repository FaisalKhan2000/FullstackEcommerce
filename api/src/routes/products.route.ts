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
import {
  verifyRole,
  verifyToken,
} from "../middleware/authenticationMiddleware";

const router = Router();

router.route("/").get(verifyToken, verifyRole(["user"]), listProducts);
router.route("/:id").get(getProductById);
router.route("/").post(validateData(createProductSchema), createProduct);
router.route("/:id").put(validateData(updateProductSchema), updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
