import { Schema } from "mongoose";
import MessageModel from "../domains/models/message.model";
import { Message, CreateMessage } from "../interfaces";

export const create = async (message: CreateMessage, user_id: Schema.Types.ObjectId): Promise<Message> => {
    const newMessage = await MessageModel.create({ ...message, user_id });
    return newMessage;
}

export const findAllByChatId = async (chatId: string): Promise<Message[]> => {
    const messages = await MessageModel.find({ chat_id: chatId });
    return messages;
}