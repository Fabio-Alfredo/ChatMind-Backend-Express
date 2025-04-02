import mongoose from "mongoose";

interface Bot {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    model: string;
    apiURL: string;
    apiToken?: string;
    active: boolean;
    createBy: mongoose.Schema.Types.ObjectId;
    compareApiToken: (token: string) => Promise<string>;
}

type CreateBot = Pick<Bot, "name" | "description" | "model" | "apiURL" | "apiToken">;
export { Bot, CreateBot };
