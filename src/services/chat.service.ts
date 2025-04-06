import * as chatRepo from "../repositories/chat.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Chat, CreateChat } from "../interfaces";

export const creteChat = async (chat: CreateChat): Promise<Chat> => {
    try {
        const existingChat: Chat | null = await chatRepo.findByName(chat.name);
        if (existingChat) {
            throw new ServiceError("Chat already exists",
                ErrorCodes.CHAT.ALREADY_EXISTS
            );
        }
        const newChat = await chatRepo.create(chat);
        return newChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findChatById = async (id: string): Promise<Chat> => {
    try {
        const chat = await chatRepo.findById(id);
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

export const findAllByUserId = async (userId: string): Promise<Chat[]> => {
    try {
        // Check if userId is a valid ObjectId
        const chats = await chatRepo.findAllByUserId(userId);
        return chats || [];
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}