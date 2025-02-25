// IMPORTS.
import { CorsOptions } from "cors";

// CORS CONFIG.
export const corsConfig: CorsOptions = {
    origin: process.env.NODE_ENV === "development" ? "*" : [process.env.DOMAIN_NAME as string], // Allow all origins in development but only a specific origin in production.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};