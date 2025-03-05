// IMPORTS.
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler.middleware";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors.config";
import helmet from "helmet";
import sendLoginOTPRouter from "./routes/auth/sendLoginOTP.route";

// APP ("security section" should always be at the top and "errohandler section" always at the bottom).
dotenv.config();
const app: Application = express();

// Security.
app.use(helmet());
app.use(cors(corsConfig));

// Middlewares.
app.use(express.json());

// Routes.
app.use("/api/auth/send-login-otp", sendLoginOTPRouter);

// ErrorHanler.
app.use(errorHandler);

// Exporting the configured express app.
export { app };

