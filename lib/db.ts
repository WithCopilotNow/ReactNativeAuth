import mongoose, { type Connection } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

let cachedConn: Connection | undefined;

export async function connectDB(): Promise<Connection | undefined> {
    if(cachedConn) return cachedConn;
    try {
        const url = process.env.MONGODB_URL;
        if(!url) throw new Error("MONGODB_URL not found in env");
        await mongoose.connect(url, { socketTimeoutMS: 10000 });
        cachedConn = mongoose.connection;
        console.log("Connected to MongoDB");
        return cachedConn;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error
    }
}