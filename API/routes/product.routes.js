import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorize(["customer", "seller"]), addProduct);

router.delete("/:id", authenticateUser, authorize(["customer", "seller"]), deleteProduct);

router.patch("/:id", authenticateUser, authorize(["customer", "seller"]), updateProduct);

router.get("/", authenticateUser, authorize(["customer", "seller"]), getAllProducts);

router.get("/:id", authenticateUser, authorize(["customer", "seller"]), getProduct);

export default router;
