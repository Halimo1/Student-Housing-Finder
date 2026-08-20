import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import { Specs } from "./config/swagger";
import { listingRouter } from "./routes/listingRoutes"
import { requestRouter } from "./routes/requestRoutes";

const app = express();
const PORT = process.env.PORT;
app.use('/listing',listingRouter);
app.use('/request',requestRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(Specs));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});