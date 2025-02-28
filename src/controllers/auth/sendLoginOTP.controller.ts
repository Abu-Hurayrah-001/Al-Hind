// IMPORTS.
import { z } from "zod";
import { asyncErrorHandler } from "../../middlewares/errorHandlers/asyncErrorHandler.middleware";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../../models/user/user.model";

// SEND LOGIN OTP TO EMAIL.
type RequestType = { email: string };
const requestSchema = z.object({ email: z.string().email() });

export const sendLoginOTP = asyncErrorHandler(async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const reqBody: RequestType = req.body;

    // Validate request data.
    const parsedRequestData = requestSchema.safeParse(reqBody);

    // Handle invalid request data.
    if (!parsedRequestData.success) {
        res.status(400).json({
            success: false,
            message: parsedRequestData.error.issues[0].message,
        });
        return;
    };

    // Find user.
    let user: IUser | null = await User.findOne({ email: reqBody.email });

    // Create a new user if email (i.e. user) does not exist.
    if (!user) {
        user = await User.create({ email: reqBody.email });
    };

    // Update OTP and OTP expiry time in user's database.
    const OTP = Math.floor(100000 + Math.random() * 9000000);
    const OTPexpiry = new Date();
    OTPexpiry.setSeconds(OTPexpiry.getSeconds() + 45);
    user!.OTP = OTP;
    user!.OTPexpiry = OTPexpiry;
    await user!.save();
    
});