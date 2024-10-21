import { OK } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";

export const createOrder = catchErrors(async (req, res) => {
  res.status(OK).json({ message: "create order" });
});
export const listOrders = catchErrors(async (req, res) => {
  res.status(OK).json({ message: "list orders" });
});
export const getOrder = catchErrors(async (req, res) => {
  res.status(OK).json({ message: "get order" });
});
export const updateOrder = catchErrors(async (req, res) => {
  res.status(OK).json({ message: "update order" });
});
