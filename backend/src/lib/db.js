import mongoose from "mongoose";
import { seedUsersIfNeeded } from "../seeds/user.seed.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    await seedUsersIfNeeded();
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
