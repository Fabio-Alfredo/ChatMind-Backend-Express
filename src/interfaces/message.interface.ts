import mongoose from "mongoose";

interface Message {
    _id: mongoose.Schema.Types.ObjectId;
    chat_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    content: string;
    sender: "user" | "bot";
    type: string;
}

type CreateMessage = Pick<Message, "chat_id" | "content" | "type"| "sender">;

export { Message, CreateMessage };