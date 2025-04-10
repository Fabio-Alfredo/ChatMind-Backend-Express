import { Schema } from "mongoose";

interface Bot {
    _id: Schema.Types.ObjectId;
    name: string;
    description: string;
    model: string;
    apiURL: string;
    apiToken: string;
    active: boolean;
    createBy: Schema.Types.ObjectId;
    compareApiToken: (token: string) => Promise<string>;
}

type CreateBot = Pick<Bot, "name" | "description" | "model" | "apiURL" | "apiToken">;
type UpdateBot = Partial<Omit<Bot, "_id" | "createBy" | "compareApiToken">>;
export { Bot, CreateBot, UpdateBot };
