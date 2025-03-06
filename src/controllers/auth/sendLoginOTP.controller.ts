// IMPORTS.
import { z } from "zod";
import { asyncErrorHandler } from "../../middlewares/errorHandlers/asyncErrorHandler.middleware";
import { Request, Response } from "express";
import User, { IUser } from "../../models/user/user.model";
import path from "path";
import ejs from "ejs";
import { Resend } from "resend";

// SEND LOGIN OTP TO EMAIL.
type RequestType = { email: string };
const requestSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address.")
});

export const sendLoginOTP = asyncErrorHandler(async (
    req: Request,
    res: Response,
): Promise<void> => {
    const reqBody: RequestType = req.body;
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not defined in enviroment variables.");
    };

    const parsedRequestData = requestSchema.safeParse(reqBody);
    const resend = new Resend(process.env.RESEND_API_KEY);

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
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const OTPexpiry = new Date();
    OTPexpiry.setSeconds(OTPexpiry.getSeconds() + 45);
    user!.OTP = OTP;
    user!.OTPexpiry = OTPexpiry;
    await user!.save();

    // Sending OTP to user's email address.
    const templatePath = path.join(__dirname, "../../views/emails/loginOTP.email.ejs");
    const html: string = await ejs.renderFile(templatePath, { OTP });

    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: reqBody.email,
        subject: "Login OTP",
        html,
    });

    if (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return;
    };

    // Sending response.
    res.status(201).json({
        success: true,
        message: "OTP sent to your email.",
    });
    return;
});