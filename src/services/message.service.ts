import * as messageRepo from "../repositories/message.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { CreateMessage, Message } from "../interfaces";

export const createMessage = async (message: CreateMessage): Promise<boolean> => {
    try {
        const newMessage: Message | null = await messageRepo.create(message);
        return !!newMessage;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}