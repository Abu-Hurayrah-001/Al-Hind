// IMPORTS.
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler.middleware";

// APP.
const app: Application = express();
app.use(errorHandler); // Always use it in the bottom of your code brother.
export { app };

