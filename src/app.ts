// IMPORTS.
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler.middleware";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors.config";

// APP.
dotenv.config();
const app: Application = express();

// CORS.
app.use(cors(corsConfig));

// Middlewares.
app.use(express.json());

// ErrorHanler.
app.use(errorHandler);

// Exporting the configured express app.
export { app };

