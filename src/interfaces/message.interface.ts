import mongoose from "mongoose";

interface Message {
    chat_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    content: string;
    sender: "user" | "bot";
    type: string;
}

export { Message };