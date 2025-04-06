import * as BotRepo from "../repositories/boot.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Bot, CreateBot, TokenPayload, UpdateBot } from "../interfaces";
import { Schema } from "mongoose";

export const create = async (bot: CreateBot, user: TokenPayload): Promise<Bot> => {
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

export const findAll = async (): Promise<Bot[]> => {
    try {
        const bots: Bot[] = await BotRepo.findAll();
        if (!bots) {
            throw new ServiceError("Bots not found",
                ErrorCodes.BOT.NOT_FOUND
            );
        }
        return bots;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const updateBot = async (id: Schema.Types.ObjectId, bot: UpdateBot): Promise<Bot> => {
    try {
        const updatedBot: Bot | null = await BotRepo.updateBot(id, bot);
        if (!updatedBot) {
            throw new ServiceError("Bot not found",
                ErrorCodes.BOT.NOT_FOUND
            );
        }
        return updatedBot;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const desactivateBot = async (id: Schema.Types.ObjectId): Promise<boolean> => {
    try {
        const existBot: Bot | null = await BotRepo.findById(id);
        if (!existBot) {
            throw new ServiceError("Bot not found",
                ErrorCodes.BOT.NOT_FOUND
            );
        }
        const desactivateBot: boolean = await BotRepo.desactivateBot(id);

        return desactivateBot;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}