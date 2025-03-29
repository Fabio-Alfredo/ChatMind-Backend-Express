import * as BotRepo from "../repositories/boot.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Bot, CreateBot } from "../interfaces";
import { Schema } from "mongoose";

export const create = async (bot: CreateBot): Promise<Bot> => {
    try {
        //TODO: Check if the bot already exists
        const newBot = await BotRepo.create(bot);
        return newBot;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findBotById = async (id: Schema.Types.ObjectId): Promise<Bot> => {
    try {
        const bot = await BotRepo.findById(id);
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