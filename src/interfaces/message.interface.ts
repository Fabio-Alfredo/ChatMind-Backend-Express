import { Schema } from "mongoose";

interface Message {
    _id: Schema.Types.ObjectId;
    chat_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    content: string;
    sender: "user" | "bot";
    type: string;
}

type CreateMessage = Pick<Message, "chat_id" | "content" | "type"| "sender">;

export { Message, CreateMessage };