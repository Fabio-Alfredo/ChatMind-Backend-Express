import mongoose from "mongoose";

interface Bot {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    model: string;
    apiURL: string;
    apiToken?: string;
    active: boolean;
}

type CreateBot = Pick<Bot, "name" | "description" | "model" | "apiURL" >;
export { Bot, CreateBot };
