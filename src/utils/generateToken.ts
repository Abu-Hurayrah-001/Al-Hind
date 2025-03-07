// IMPORTS.
import jwt from "jsonwebtoken";

// GENERATE TOKEN.
export const generateToken = async (payload: object): Promise<string> => {
    return new Promise((resolve, reject) => {
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            return reject(new Error("TOKEN_SECRET is not defined in environment variables."));
        };

        jwt.sign(
            payload,
            tokenSecret,
            {
                expiresIn: "1d",
                algorithm: "HS256"
            },
            (
                err,
                token,
            ) => {
                if (err || !token) {
                    return reject(err || new Error("Token generation failed."));
                };
                resolve(token);
            },
        );
    });
};
