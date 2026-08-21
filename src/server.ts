import "dotenv/config";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import swaggerUi from "swagger-ui-express";
import { setupSwagger } from './config/swagger';
import { listingRouter } from "./routes/listingRoutes";
import { requestRouter } from "./routes/requestRoutes";
import { authRouter } from "./routes/authRoutes";

const app:Application = express();
const PORT = process.env.PORT;
app.use(express.json());
setupSwagger(app);
app.use(cookieParser());
app.use('/listing',listingRouter);
app.use('/request',requestRouter);
app.use('/auth',authRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 