import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorize(["seller"]), addProduct);

router.delete("/:id", authenticateUser, authorize(["seller"]), deleteProduct);

router.patch("/:id", authenticateUser, authorize(["seller"]), updateProduct);

router.get("/", authenticateUser, authorize(["seller"]), getAllProducts);

export default router;
