import { Router } from "express";
import {
  addOrder,
  updateOrder,
  getorders,
  getOrdersById,
  getSellerOrders
} from "../controllers/order.controller.js";
import authorize from "../middlewares/role.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const OrderRoutes = Router();

OrderRoutes.post(
  "/",
  authenticateUser,
  authorize(["customer", "seller"]),
  addOrder
);
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
  authorize(["customer", "seller"]),
  getOrdersById
);

OrderRoutes.get(
  "/seller-orders",
  authenticateUser,
  authorize(["customer", "seller"]),
  getSellerOrders
);
export default OrderRoutes;
