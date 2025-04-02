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
        },
        active: {
            type: Boolean,
            default: true,
        },
        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

botSchema.pre("save", async function (next) {
    if (this.isModified("apiToken")) {
        this.apiToken = generateHash(this.apiToken);
    }
    next();

})

botSchema.methods.compareApiToken = async function (token: string): Promise<String> {
        return await compareHash(token);
    }


const BotModel = model<Bot>('Bot', botSchema);

export default BotModel;