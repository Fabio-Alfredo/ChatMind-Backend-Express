import * as chatRepo from "../repositories/chat.repository";
import { findBotById } from "./bot.service";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Chat, CreateChat, CreateMessage, UpdateChat } from "../interfaces";
import { Schema } from "mongoose";

export const creteChat = async (chat: CreateChat, user: Schema.Types.ObjectId): Promise<Chat> => {
    try {
        const existingChat: Chat | null = await chatRepo.findByName(chat.name);
        if (existingChat) {
            throw new ServiceError("Chat already exists",
                ErrorCodes.CHAT.ALREADY_EXISTS
            );
        }
        const newChat = await chatRepo.create(chat, user);
        return newChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findChatById = async (id: string): Promise<Chat> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }

        return chat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const findAllByUserId = async (userId: Schema.Types.ObjectId): Promise<Chat[]> => {
    try {
        // Check if userId is a valid ObjectId
        const chats: Chat[] = await chatRepo.findAllByUserId(userId);
        return chats;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const updateChat = async (id: string, newChat: UpdateChat): Promise<boolean> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }

        if (newChat.bot_id)
            await findBotById(newChat.bot_id.toString());

        const updated = await chatRepo.updateChat(id, newChat);
        return updated;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const deleteChat = async (id: string): Promise<boolean> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }
        const deletedChat = await chatRepo.deleteChat(id);
        return deletedChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const addMessages = async (chatId: string, messages: Schema.Types.ObjectId): Promise<boolean> => {
    try {
        const chat: Chat | null = await chatRepo.findById(chatId);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }
        chat.messages.push(messages);
        const updated: Chat = await chatRepo.save(chat);

        return !!updated;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}