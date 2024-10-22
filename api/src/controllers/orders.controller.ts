import { db } from "../db/db.js";
import { OK, UNAUTHORIZED } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import { orderItemsTable, ordersTable } from "../db/orders.schema.js";
import AppError from "../utils/AppError.js";

export const createOrder = catchErrors(async (req, res, next) => {
  const { order, items } = req.cleanBody;

  const userId = req.userId;

  if (!userId) {
    return next(new AppError(UNAUTHORIZED, "Invalid authorization"));
  }

  const [newOrder] = await db
    .insert(ordersTable)
    .values({ userId: userId })
    .returning();

  const orderItems = items.map((item: any) => ({
    ...item,
    orderId: newOrder.id,
  }));

  // TODO: validate products ids, and take their actual price from db
  const newOrderItems = await db
    .insert(orderItemsTable)
    .values(orderItems)
    .returning();

  res
    .status(OK)
    .json({ message: "order successful", newOrder, items: newOrderItems });
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
