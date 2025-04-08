import * as chatService from '../services/chat.service';
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { Chat, CreateChat, UpdateChat } from '../interfaces';
import { responseHandler } from '../handlers/response.handler';
import { Schema } from 'mongoose';
import ErrorCodes from '../utils/error/codes/error.codes';

export const createChat = async (req: Request<{}, {}, CreateChat>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chat: CreateChat = req.body;
        const userId: Schema.Types.ObjectId = req.dataUser._id;
        const newChat: Chat = await chatService.creteChat(chat, userId);
        return responseHandler(res, "created chat", 201, newChat);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.CHAT.ALREADY_EXISTS:
                next(createHttpError(409, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
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
            case ErrorCodes.CHAT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
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
            case ErrorCodes.CHAT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.USER.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}

export const updateChat = async (req: Request<{ id: string }, {}, UpdateChat>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chatId: string = req.params.id;
        const dataChat: UpdateChat = req.body;
        const updated: boolean = await chatService.updateChat(chatId, dataChat);
        return responseHandler(res, "updated chat", 200, updated);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.CHAT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.BOT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}

export const deleteChat = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chatId: string = req.params.id;
        const deleted: boolean = await chatService.deleteChat(chatId);
        return responseHandler(res, "deleted chat", 200, deleted);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.CHAT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}

export const createChatMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const chatUrl: string = req.body.chatUrl;
        const chatToke: string = req.body.chatToken;
        const message: string = req.body.message;
        const response = await chatService.createRequest(chatToke, chatUrl, message);
        return responseHandler(res, "created chat message", 200, response);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.CHAT.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}
