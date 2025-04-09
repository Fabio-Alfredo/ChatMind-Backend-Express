import { Schema } from "mongoose";
import ChatModel from "../domains/models/chat.model";
import { Chat, CreateChat, UpdateChat } from "../interfaces";

export const create = async (chat: CreateChat, user_id: Schema.Types.ObjectId): Promise<Chat> => {
    const newChat = await ChatModel.create({
        ...chat,
        user_id,
    });
    return newChat;
}

export const save = async (chat: Chat): Promise<Chat> => {
    const newChat = await ChatModel.create(chat);
    return newChat;
}

export const findById = async (id: string): Promise<Chat | null> => {
    const chat = await ChatModel.findById(id);
    return chat;
}

export const findAllByUserId = async (userId: Schema.Types.ObjectId): Promise<Chat[]> => {
    const chats = await ChatModel.find({ user_id: userId }).populate("messages");
    return chats;
}

export const findByName = async (name: string): Promise<Chat | null> => {
    const chat = await ChatModel.findOne({ name });
    return chat;
}

export const updateChat = async (id: string, chatData: UpdateChat): Promise<boolean> => {
    const chat = await ChatModel.findByIdAndUpdate(id, chatData, { new: true });
    return !!chat;
}

export const deleteChat = async (id: string): Promise<boolean> => {
    const chat = await ChatModel.findByIdAndDelete(id);
    return !!chat;
}