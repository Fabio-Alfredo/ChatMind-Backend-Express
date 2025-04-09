import * as messageRepo from "../repositories/message.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { CreateMessage, Message } from "../interfaces";
import { Schema } from "mongoose";

export const createMessage = async (message: CreateMessage, user_id:Schema.Types.ObjectId): Promise<Message> => {
    try {
        const newMessage: Message | null = await messageRepo.create(message, user_id);
        return newMessage;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}