import * as botService from "../services/bot.service";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { Bot, CreateBot } from "../interfaces";
import { Schema } from "mongoose";
import { responseHandler } from "../handlers/response.handler";

export const createBot = async (req: Request<{}, {}, CreateBot>, res: Response, next: NextFunction): Promise<void> => {

    try {
        const bot: CreateBot = req.body;
        const newBot: Bot = await botService.create(bot);
        return responseHandler(res, "created bot", 201, newBot);
    } catch (e: any) {
        switch (e.code) {
            case "BOT_NOT_FOUND":
                next(createHttpError(404, e.message));
                break;
            case "BOT_ALREADY_EXISTS":
                next(createHttpError(409, e.message));
                break;
            case "INTERNAL_SERVER_ERROR":
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}


export const findBotById = async (req: Request<{ id: Schema.Types.ObjectId }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const botId: Schema.Types.ObjectId = req.params.id;
        const bot: Bot = await botService.findBotById(botId);
        return responseHandler(res, "found bot", 200, bot);
    } catch (e: any) {
        switch (e.code) {
            case "BOT_NOT_FOUND":
                next(createHttpError(404, e.message));
                break;
            case "INTERNAL_SERVER_ERROR":
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}