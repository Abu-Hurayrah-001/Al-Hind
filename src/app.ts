// IMPORTS.
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler.middleware";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors.config";
import helmet from "helmet";

// APP ("security section" should always be at the top and "errohandler section" always at the bottom).
dotenv.config();
const app: Application = express();

// Security.
app.use(helmet());
app.use(cors(corsConfig));

// Middlewares.
app.use(express.json());

// ErrorHanler.
app.use(errorHandler);

// Exporting the configured express app.
export { app };

