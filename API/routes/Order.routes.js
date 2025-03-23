import { Router } from "express";
import {
  addOrder,
  updateOrder,
  getorders,
  getOrdersById,
} from "../controllers/order.controller.js";
import authorize from "../middlewares/role.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const OrderRoutes = Router();

OrderRoutes.post("/", authenticateUser, authorize(["customer"]), addOrder);
OrderRoutes.put(
  "/",
  authenticateUser,
  authorize(["seller", "admin"]),
  updateOrder
);
OrderRoutes.get(
  "/",
  authenticateUser,
  authorize(["seller", "admin"]),
  getorders
);
OrderRoutes.get(
  "/customer-orders",
  authenticateUser,
  authorize(["customer"]),
  getOrdersById
);

export default OrderRoutes;
