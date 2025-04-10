import * as messageRepo from "../repositories/message.repository";
import { findChatById } from "./chat.service";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Chat, CreateMessage, Message } from "../interfaces";
import { Schema } from "mongoose";

export const createMessage = async (message: CreateMessage, user_id: Schema.Types.ObjectId): Promise<Message> => {
    try {
        const newMessage: Message | null = await messageRepo.create(message, user_id);
        return newMessage;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const findAllByChatId = async (chatId: string): Promise<Message[]> => {
    try {
        const chat: Chat | null = await findChatById(chatId);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }
        const messages: Message[] = await messageRepo.findAllByChatId(chatId);
        return messages;
    } catch (e: any) {
        throw new ServiceError(
            e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}