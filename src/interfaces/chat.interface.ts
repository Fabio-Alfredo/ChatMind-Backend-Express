import { Schema } from "mongoose";

interface Chat {
    _id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    bot_id: Schema.Types.ObjectId;
    name: string;
    messages: Schema.Types.ObjectId[];
}
type CreateChat = Pick<Chat, | "bot_id" | "name">;
type UpdateChat = Partial<Pick<Chat, "name" | "bot_id">>;
export { Chat, CreateChat, UpdateChat };