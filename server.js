import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import passport from "passport";
import { configurePassport } from "./passport.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
configurePassport(passport);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`The server is running at ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to connect DB", err);
  }
}
startServer();
