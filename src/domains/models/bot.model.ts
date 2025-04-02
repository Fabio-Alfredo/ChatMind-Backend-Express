import { Schema, model } from "mongoose";
import { Bot } from "../../interfaces";
import { generateHash, compareHash } from "../../utils/security/ecript.security";

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
            set: generateHash
        },
        active: {
            type: Boolean,
            default: true,
        },
        createBy:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);


botSchema.methods.compareApiToken = async function (token: string): Promise<String> {
    return await compareHash(token);
}


const BotModel = model<Bot>('Bot', botSchema);

export default BotModel;