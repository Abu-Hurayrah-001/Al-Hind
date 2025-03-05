// IMPORTS.
import { Router } from "express";
import { sendLoginOTP } from "../../controllers/auth/sendLoginOTP.controller";

// SEND LOGIN OTP.
const sendLoginOTPRouter = Router();
sendLoginOTPRouter.post("/", sendLoginOTP);
export default sendLoginOTPRouter;