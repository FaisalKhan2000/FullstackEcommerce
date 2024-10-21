import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";

export const listProducts = catchErrors(async (req, res) => {
  res.status(OK).json("list products");
});

export const getProductById = catchErrors(async (req, res) => {
  res.status(OK).json("get product by id");
});

export const createProduct = catchErrors(async (req, res) => {
  res.status(CREATED).json("create product");
});

export const updateProduct = catchErrors(async (req, res) => {
  res.status(OK).json("update product");
});

export const deleteProduct = catchErrors(async (req, res) => {
  res.status(OK).json("delete product");
});
