import * as chatService from '../services/chat.service';
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { Chat, CreateChat } from '../interfaces';
import { responseHandler } from '../handlers/response.handler';
import { Schema } from 'mongoose';

export const createChat = async (req: Request<{}, {}, CreateChat>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chat: CreateChat = req.body;
        const userId: Schema.Types.ObjectId = req.dataUser._id;
        const newChat: Chat = await chatService.creteChat(chat, userId);
        return responseHandler(res, "created chat", 201, newChat);
    } catch (e: any) {
        switch (e.code) {
            case "CHAT_ALREADY_EXISTS":
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

export const findChatById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chatId: string = req.params.id;
        const chat: Chat = await chatService.findChatById(chatId);
        return responseHandler(res, "found chat", 200, chat);
    } catch (e: any) {
        switch (e.code) {
            case "CHAT_NOT_FOUND":
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

export const findAllByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: Schema.Types.ObjectId = req.dataUser._id;
        const chats: Chat[] = await chatService.findAllByUserId(userId);
        return responseHandler(res, "found chats", 200, chats);
    } catch (e: any) {
        switch (e.code) {
            case "CHAT_NOT_FOUND":
                next(createHttpError(404, e.message));
                break;
            case "USER_NOT_FOUND":
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