import express from "express";
import {
  SellerRegister,
  UpdateSeller,
  SellerDetailsById,
  deletSeller,
} from "../controllers/seller.contoller.js";

const SellerRouter = express.Router();

SellerRouter.post("/", SellerRegister);
SellerRouter.put("/", UpdateSeller);
SellerRouter.get("/", SellerDetailsById);
SellerRouter.delete("/", deletSeller);

export default SellerRouter;
