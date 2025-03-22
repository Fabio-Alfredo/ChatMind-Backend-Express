
import mongoose from "mongoose";
interface chat {
    user_id: mongoose.Schema.Types.ObjectId;
    bot_id: mongoose.Schema.Types.ObjectId;
    name: string;
}

export { chat };