// ERROR FOR THE ENTIRE APPLICATION.
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean; // False means an unexpected error.

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    };
};