import mongoose from "mongoose";

interface Chat {
    _id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    bot_id: mongoose.Schema.Types.ObjectId;
    name: string;
}
type CreateChat = Pick<Chat, "user_id" | "bot_id" | "name">;
export { Chat, CreateChat };