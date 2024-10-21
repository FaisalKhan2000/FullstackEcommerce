import { eq } from "drizzle-orm";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/http";
import { db } from "../db/db";
import { createProductSchema, productsTable } from "../db/products.schema";
import AppError from "../utils/AppError";
import catchErrors from "../utils/catchErrors";
import _ from "lodash";

export const listProducts = catchErrors(async (req, res) => {
  const products = await db.select().from(productsTable);
  res.status(OK).json({ size: products.length, products });
});

export const getProductById = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return next(new AppError(BAD_REQUEST, `Invalid product ID: ${id}`));
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId));

  if (products.length === 0) {
    return next(
      new AppError(NOT_FOUND, `product with ID: ${id} doesn't exits`)
    );
  }

  res.status(OK).json(products[0]);
});

export const createProduct = catchErrors(async (req, res) => {
  const data = req.cleanBody;

  const products = await db.insert(productsTable).values(data).returning();

  res
    .status(CREATED)
    .json({ message: "product created successfully", product: products[0] });
});

export const updateProduct = catchErrors(async (req, res, next) => {
  const data = req.cleanBody;
  const { id } = req.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return next(new AppError(BAD_REQUEST, `Invalid product ID: ${id}`));
  }

  const updatedProducts = await db
    .update(productsTable)
    .set(data)
    .where(eq(productsTable.id, productId))
    .returning();

  if (updatedProducts.length === 0) {
    return next(
      new AppError(NOT_FOUND, `Product with ID: ${id} doesn't exist`)
    );
  }

  res.status(OK).json({
    message: "Product updated successfully",
    updatedProduct: updatedProducts[0],
  });
});

export const deleteProduct = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return next(new AppError(BAD_REQUEST, `Invalid product ID: ${id}`));
  }

  const deletedProducts = await db
    .delete(productsTable)
    .where(eq(productsTable.id, productId))
    .returning();

  if (deletedProducts.length === 0) {
    return next(
      new AppError(NOT_FOUND, `Product with ID: ${id} doesn't exist`)
    );
  }

  res.status(OK).json({
    message: "Product deleted successfully",
    deletedProduct: deletedProducts[0],
  });
});
