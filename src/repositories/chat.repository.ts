import ChatModel from "../domains/models/chat.model";
import { Chat, CreateChat } from "../interfaces";
import { Schema } from 'mongoose';

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

