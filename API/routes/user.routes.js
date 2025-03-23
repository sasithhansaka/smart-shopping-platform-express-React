import express from "express";

import { authenticateUser } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import {
  changePassword,
  updateAccount,
  deleteAccount,
  addFeedback,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.patch(
  "/customer/password",
  authenticateUser,
  authorize(["customer"]),
  changePassword
);

userRoutes.post(
  "/customer/feedback",
  authenticateUser,
  authorize(["customer"]),
  addFeedback
);

userRoutes.patch(
  "/customer/update",
  authenticateUser,
  authorize("customer"),
  updateAccount
);

userRoutes.delete(
  "/customer/delete",
  authenticateUser,
  authorize("customer"),
  deleteAccount
);

export default userRoutes;
