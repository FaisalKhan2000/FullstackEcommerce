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

router.route("/").get(listProducts);
router.route("/:id").get(getProductById);
router
  .route("/")
  .post(
    verifyToken,
    verifyRole(["seller"]),
    validateData(createProductSchema),
    createProduct
  );
router
  .route("/:id")
  .put(
    verifyToken,
    verifyRole(["seller"]),
    validateData(updateProductSchema),
    updateProduct
  );
router.route("/:id").delete(verifyToken, verifyRole(["seller"]), deleteProduct);

export default router;
