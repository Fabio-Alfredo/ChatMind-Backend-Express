import * as chatRepo from "../repositories/chat.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Chat, CreateChat } from "../interfaces";

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