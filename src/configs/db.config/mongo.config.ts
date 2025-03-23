import mongoose from "mongoose";
import { currentEnv } from "../config";

const uri: string = currentEnv.mongoUri as string;


const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Error connecting to MongoDB", e);

        process.exit(1);
    }
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
})

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
})

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
})

export { connectDb };