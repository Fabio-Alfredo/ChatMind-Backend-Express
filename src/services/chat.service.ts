import * as chatRepo from "../repositories/chat.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Chat, CreateChat } from "../interfaces";
import { Schema } from "mongoose";

export const creteChat = async (chat: CreateChat): Promise<Chat> => {
    try {
        //TODO: Check if the chat already exists
        const newChat = await chatRepo.create(chat);
        return newChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findChatById = async (id: Schema.Types.ObjectId): Promise<Chat> => {
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

export const findAllByUserId = async (userId: Schema.Types.ObjectId): Promise<Chat[]> => {
    try {
        const chats = await chatRepo.findAllByUserId(userId);
        return chats || [];
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}