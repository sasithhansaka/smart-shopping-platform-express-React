import express from "express";
import {
  SellerRegister,
  UpdateSeller,
  SellerDetailsById,
  deleteSeller,
} from "../controllers/seller.contoller.js";

import { authenticateUser } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const SellerRoutes = express.Router();

SellerRoutes.post(
  "/",
  authenticateUser,
  authorize(["seller", "customer"]),
  SellerRegister
);
SellerRoutes.put(
  "/",
  authenticateUser,
  authorize(["seller", "customer"]),
  UpdateSeller
);
SellerRoutes.get(
  "/",
  authenticateUser,
  authorize(["seller", "customer"]),
  SellerDetailsById
);
SellerRoutes.delete("/", authenticateUser, authorize(["seller"]), deleteSeller);

export default SellerRoutes;
