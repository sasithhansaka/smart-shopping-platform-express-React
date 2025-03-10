import express from "express";

import { authenticateUser } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import { changePassword } from "../controllers/user.controller.js";

const router = express.Router();

router.patch(
  "/customer/password",
  authenticateUser,
  authorize(["customer"]),
  changePassword
);

router.post(
  "/customer/feedback",
  authenticateUser,
  authorize(["customer"]),
  addFeedback
);

export default router;
