// IMPORTS.
import { app } from "./app"
import dotenv from "dotenv";
import { connectPrimaryDB } from "./utils/connectPrimaryDB";

// SERVER.
dotenv.config();
const port = Number(process.env.PORT) || 8000;

const startServer = async(): Promise<void> => {
    try {
        await connectPrimaryDB();
        app.listen(port, () => {
            console.log(`Server is up an running on PORT: ${port}.`);
        });
    } catch (error) {
        console.error("Error during server startup: ", error);
        process.exit(1);
    };
};

startServer();