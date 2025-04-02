import * as BotRepo from "../repositories/boot.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Bot, CreateBot, TokenPayload } from "../interfaces";
import { Schema } from "mongoose";

export const create = async (bot: CreateBot, user:TokenPayload): Promise<Bot> => {
    try {
        const existBot: boolean = await BotRepo.existBot(bot.name, bot.apiURL);
        if (existBot) {
            throw new ServiceError("There is already a bot with that name or URL", ErrorCodes.BOT.ALREADY_EXISTS_BOT)
        }

        const newBot: Bot = await BotRepo.create(bot, user._id);

        return newBot;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findBotById = async (id: Schema.Types.ObjectId): Promise<Bot> => {
    try {
        const bot: Bot | null = await BotRepo.findById(id);
        if (!bot) {
            throw new ServiceError("Bot not found",
                ErrorCodes.BOT.NOT_FOUND
            );
        }
        return bot;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}