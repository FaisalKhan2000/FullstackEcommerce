import express from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.route("/").get(listOrders).post(createOrder);
router.route("/:id").get(getOrder).put(updateOrder);
export default router;
