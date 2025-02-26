import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandlere.middleware.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import EmailRouter from "./routes/email.routes.js";
import SellerRouter from "./routes/seller.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/emails", EmailRouter);
app.use("/api/seller",SellerRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;
