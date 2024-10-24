import express from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../controllers/orders.controller.js";
import { validateData } from "../middleware/validationMiddleware.js";
import {
  insertOrderSchema,
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../db/orders.schema.js";
import { verifyToken } from "../middleware/authenticationMiddleware.js";

const router = express.Router();

// create order schema
// {
//   "order":{

//   },
//   "items":[
//      {
//         "productId":12,
//         "quantity":3,
//         "price":2999.97
//      },
//      {
//         "productId":13,
//         "quantity":5,
//         "price":4999.95
//      }
//   ]
// }

router
  .route("/")
  .get(verifyToken, listOrders)
  .post(verifyToken, validateData(insertOrderWithItemsSchema), createOrder);

router
  .route("/:id")
  .get(verifyToken, getOrder)
  .put(verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
