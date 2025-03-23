import mongoose from "mongoose";

interface Message {
    chat_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    content: string;
    type: string;
}

export { Message };