// IMPORTS.
import { Request, Response, NextFunction } from "express";

// GENERAL ERROR HANDLING.
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode: number = err.statusCode || 500;
    let message: string = err.message || "Internal server error.";

    // For unexpected errors in production.
    if (process.env.NODE_ENV != "development" && !err.isOperational) {
        statusCode = 500;
        message = "Something went wrong.";
    };

    // For all errors in development.
    if (process.env.NODE_ENV === "development") {
        console.error("Error details:", err);
    };

    // Sending response.
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};