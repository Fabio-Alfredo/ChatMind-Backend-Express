import MessageModel from "../domains/models/message.model";
import { Message, CreateMessage } from "../interfaces";

export const create = async (message: CreateMessage): Promise<Message> => {
    const newMessage = await MessageModel.create(message);
    return newMessage;
}

export const findAllByChatId = async (chatId: string): Promise<Message[]> => {
    const messages = await MessageModel.find({ chat_id: chatId });
    return messages;
}