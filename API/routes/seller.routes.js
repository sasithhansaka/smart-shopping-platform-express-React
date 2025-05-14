import express from "express";
import {
  SellerRegister,
  UpdateSeller,
  SellerDetailsById,
  deleteSeller,
  SellerDetailsByRequestId,
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

SellerRoutes.get(
  "/SellerDetails",
  authenticateUser,
  authorize(["seller", "customer"]),
  SellerDetailsById
);

SellerRoutes.get(
  "/:id", // Use dynamic route parameter for ID
  authenticateUser,
  authorize(["seller", "customer"]),
  SellerDetailsByRequestId // Use the correct controller function
);

export default SellerRoutes;
