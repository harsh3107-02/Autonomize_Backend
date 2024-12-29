import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api", userRoutes);

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

export default app;
