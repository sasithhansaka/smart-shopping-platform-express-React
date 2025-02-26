import { Router } from "express";
import { addOrder, updateOrder, getorders, getOrdersById  } from "../controllers/order.controller.js";

const OrderRoutes = Router();

OrderRoutes.post("/", addOrder);
OrderRoutes.put("/", updateOrder);    
OrderRoutes.get("/", getorders);
OrderRoutes.get("/customer-orders", getOrdersById);

export default OrderRoutes;
