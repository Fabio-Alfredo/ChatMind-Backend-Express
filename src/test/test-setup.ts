import mongoose from "mongoose";
import { currentEnv } from "../configs/config";

beforeAll(async () => {
    await mongoose.connect(currentEnv.mongoUri as string);
    console.log("Connected to MongoDB");
})

afterAll(async () => {
        if (!mongoose.connection.db) {
            console.error("No database connection");
            return;
        }
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        console.log("MongoDB connection closed and database dropped");
})

afterEach(async () => {
    
});