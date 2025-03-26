import { Schema, model } from "mongoose";
import { Bot } from "../../interfaces";

const botSchema = new Schema<Bot>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        apiURL: {
            type: String,
            required: true,
        },
        apiToken: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

const BotModel = model<Bot>('Bot', botSchema);

export default BotModel;