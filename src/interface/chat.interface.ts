import mongoose from "mongoose";

interface Chat {
    user_id: mongoose.Schema.Types.ObjectId;
    bot_id: mongoose.Schema.Types.ObjectId;
    name: string;
}

export { Chat };