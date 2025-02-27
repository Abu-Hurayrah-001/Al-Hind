// IMPORTS.
import mongoose, { Schema, Document } from "mongoose";

// USER MODEL.
export interface IUser extends Document {
    email: string;
    OTP?: number;
    OTPexpiry?: Date;
    isAdmin?: boolean;
};

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [
            true,
            "Please enter your email."
        ],
        unique: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address.",
        ],
    },
    OTP: {
        type: Number,
        min: [
            100000,
            "OTP must be a 6-digit number.",
        ],
        max: [
            999999,
            "OTP must be a 6-digit number.",
        ],
    },
    OTPexpiry: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    strict: true,
    minimize: false,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;