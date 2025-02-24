// IMPORTS.
import { Request, Response, NextFunction } from "express";

// ASYNC ERROR HANDLING.
export const asyncErrorHandler = (fn: (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>) => {
    // Returning a new function which runs "fn", catches it's error and passes it to the global error middleware i.e."errorHandler".
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> => fn(
        req,
        res,
        next,
    ).catch(next); // catch(next) catches the error and calls next(error) which in turn passes the error to "errorHandler" i.e. our global error-handling middleware.
};