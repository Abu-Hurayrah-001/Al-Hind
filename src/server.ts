// IMPORTS.
import { Request, Response } from "express";
import { app } from "./app"
import dotenv from "dotenv";

// SERVER.
dotenv.config();
const port = Number(process.env.PORT) || 8000;

app.listen(port, () => {
    console.log(`Server is up an running on PORT: ${port}.`);
});