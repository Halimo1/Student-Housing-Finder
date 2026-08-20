import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});