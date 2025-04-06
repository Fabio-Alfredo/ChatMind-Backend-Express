import ChatModel from "../domains/models/chat.model";
import { Chat, CreateChat } from "../interfaces";

export const create = async (chat: CreateChat): Promise<Chat> => {
    const newChat = await ChatModel.create(chat);
    return newChat;
}

export const findById = async (id: string): Promise<Chat | null> => {
    const chat = await ChatModel.findById(id);
    return chat;
}

export const findAllByUserId = async (userId: string): Promise<Chat[]> => {
    const chats = await ChatModel.find({ user_id: userId });
    return chats;
}

export const findByName = async (name: string): Promise<Chat | null> => {
    const chat = await ChatModel.findOne({ name });
    return chat;
}

export const updateChat = async (id: string, name: string): Promise<boolean> => {
    const chat = await ChatModel.findByIdAndUpdate(id, { name }, { new: true });
    return !!chat;
}

export const deleteChat = async (id: string): Promise<boolean> => {
    const chat = await ChatModel.findByIdAndDelete(id);
    return !!chat;
}