import mongoose from "mongoose";
import "dotenv/config";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, clientOptions);
};

export default connectDB;
