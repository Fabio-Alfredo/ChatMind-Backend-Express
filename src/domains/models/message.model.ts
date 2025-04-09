import { Schema, model } from "mongoose";
import { Message } from "../../interfaces";

const messageSchema = new Schema<Message>(
    {
        chat_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        sender:{
            type:String,
            enum: ["user", "bot"],
            required: true,
            default: "user",
        }
    },
    {
        timestamps: true,
    }
)

const MessageModel = model<Message>('Message', messageSchema);

export default MessageModel;