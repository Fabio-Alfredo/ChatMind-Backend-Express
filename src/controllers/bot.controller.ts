import * as botService from "../services/bot.service";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { Bot, CreateBot, TokenPayload, UpdateBot } from "../interfaces";
import { Schema } from "mongoose";
import { responseHandler } from "../handlers/response.handler";

export const createBot = async (req: Request<{}, {}, CreateBot>, res: Response, next: NextFunction): Promise<void> => {

    try {
        const bot: CreateBot = req.body;
        const user: TokenPayload = req.dataUser;
        const newBot: Bot = await botService.create(bot, user);
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


export const findBotById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const botId: string = req.params.id;
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

export const findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bots: Bot[] = await botService.findAll();
        return responseHandler(res, "found bots", 200, bots);
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

export const updateBot = async (req: Request<{ id: string }, {}, UpdateBot>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const botId: string = req.params.id;
        const bot: UpdateBot = req.body;
        const updatedBot: Bot = await botService.updateBot(botId, bot);
        return responseHandler(res, "updated bot", 200, updatedBot);
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

export const desactivateBot = async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const botId: string = req.params.id;
        await botService.desactivateBot(botId);
        return responseHandler(res, "desactivated bot", 200, {});
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