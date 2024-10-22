import { db } from "../db/db.js";
import { NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import { orderItemsTable, ordersTable } from "../db/orders.schema.js";
import AppError from "../utils/AppError.js";
import { eq } from "drizzle-orm";

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

// if req.role is admin, return all orders
// if req.role is seller, return orders by sellerId
// else, return only orders filtered by req.userId
export const listOrders = catchErrors(async (req, res) => {
  const orders = await db.select().from(ordersTable);
  res.status(OK).json(orders);
});

export const getOrder = catchErrors(async (req, res, next) => {
  const id = parseInt(req.params.id);

  // TODO: required to setup the relationship
  // const result = await db.query.ordersTable.findFirst({
  //   where: eq(ordersTable.id, id),
  //   with: {
  //     items: true,
  //   },
  // });

  const orderWithItems = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, id))
    .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

  if (orderWithItems.length === 0) {
    return next(new AppError(NOT_FOUND, "Order not found"));
  }

  const mergedOrder = {
    ...orderWithItems[0].orders,
    items: orderWithItems.map((oi) => oi.order_items),
  };

  res.status(OK).json({ mergedOrder });
});

export const updateOrder = catchErrors(async (req, res, next) => {
  const id = parseInt(req.params.id);

  const [updatedOrder] = await db
    .update(ordersTable)
    .set(req.body)
    .where(eq(ordersTable.id, id))
    .returning();

  if (!updatedOrder) {
    return next(new AppError(NOT_FOUND, "Order not found"));
  }

  res.status(OK).json(updatedOrder);
});
