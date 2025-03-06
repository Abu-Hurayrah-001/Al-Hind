// IMPORTS.
import { Request, Response } from "express";
import { z } from "zod";
import { asyncErrorHandler } from "../../middlewares/errorHandlers/asyncErrorHandler.middleware";
import User, { IUser } from "../../models/user/user.model";

// lOGIN.
type RequestType = {
    email: string;
    OTP: number;
};

const requestSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address."),
    OTP: z
        .number()
        .refine((val: number) => val.toString().length === 6, { message: "OTP must have 6 digits." })
});

export const loginController = asyncErrorHandler(async (
    req: Request,
    res: Response
): Promise<void> => {
    const reqBody: RequestType = req.body;
    const parsedRequestData = requestSchema.safeParse(reqBody);

    // Handle invalid request data
    if (!parsedRequestData.success) {
        res.status(400).json({
            success: false,
            message: parsedRequestData.error.issues[0].message,
        });
        return;
    };

    // Find user and send appropriate response if user does not exist.
    const user: IUser | null = await User.findOne({ email: reqBody.email });
    if (!user) {
        res.status(409).json({
            success: false,
            message: "User does not exist.",
        });
        return;
    };

    // Verify entered OTP from the one in the user's database.
    if (reqBody.OTP != user.OTP) {
        res.status(401).json({
            success: false,
            message: "OTP is incorrect."
        });
        return;
    };

    // Update OTP expiry time in the user's database.
    const currentTime = new Date();
    if (user.OTPexpiry) {
        const remainingTime = (user.OTPexpiry.valueOf() - currentTime.valueOf()) / 1000;
        if (remainingTime <= 0) {
            res.status(401).json({
                success: false,
                message: "OTP has expired.",
            });
            return;
        } else {
            user.OTPexpiry = new Date(); // This will ensure that the user can't enter the same OTP to login again.
            await user.save();
        };
    };
});