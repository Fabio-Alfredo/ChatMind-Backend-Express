import * as chatRepo from "../repositories/chat.repository";
import { findBotById } from "./bot.service";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { Bot, Chat, CreateChat, CreateMessage, Message, UpdateChat } from "../interfaces";
import mongoose, { mongo, Schema } from "mongoose";
import axios from "axios";
import { createMessage } from "./message.service";
import { createRequest } from "../utils/requests/http.requests";

export const creteChat = async (chat: CreateChat, user: Schema.Types.ObjectId): Promise<Chat> => {
    try {
        const existingChat: Chat | null = await chatRepo.findByName(chat.name);
        if (existingChat) {
            throw new ServiceError("Chat already exists",
                ErrorCodes.CHAT.ALREADY_EXISTS
            );
        }
        const newChat:Chat = await chatRepo.create(chat, user);
        return newChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const findChatById = async (id: string): Promise<Chat> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }

        return chat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const findAllByUserId = async (userId: Schema.Types.ObjectId): Promise<Chat[]> => {
    try {
        // Check if userId is a valid ObjectId
        const chats: Chat[] = await chatRepo.findAllByUserId(userId);
        return chats;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const updateChat = async (id: string, newChat: UpdateChat): Promise<boolean> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }

        if (newChat.bot_id)
            await findBotById(newChat.bot_id.toString());

        const updated = await chatRepo.updateChat(id, newChat);
        return updated;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const deleteChat = async (id: string): Promise<boolean> => {
    try {
        const chat: Chat | null = await chatRepo.findById(id);
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }
        const deletedChat = await chatRepo.deleteChat(id);
        return deletedChat;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

export const addMessages = async (messages: CreateMessage, userId: Schema.Types.ObjectId): Promise<string> => {
    try {
        const chat: Chat | null = await chatRepo.findById(messages.chat_id.toString());
        if (!chat) {
            throw new ServiceError("Chat not found",
                ErrorCodes.CHAT.NOT_FOUND
            );
        }
        //Creacion de mensage
        const message:Message = await createMessage(messages, userId);

        //Pedimos repuesta al bot
        const chatBot:CreateMessage = await botMessage(
            chat.bot_id.toString(),
            messages.chat_id,
            messages.content
        );


        //Creacion del mensaje de respuesta
        const botResponse:Message = await createMessage(chatBot, userId);
        chat.messages.push(message._id);
        chat.messages.push(botResponse._id);

        //Guardar el mensaje en el chat
        await chatRepo.save(chat);

        return chatBot.content;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

const botMessage = async (botId: string, chatId: Schema.Types.ObjectId, message: string): Promise<CreateMessage> => {
    try {
        const bot:Bot= await findBotById(botId);
        const chatToken: string = await bot.compareApiToken(bot.apiToken);
        const res :string = await createRequest(
            chatToken,
            bot.apiURL,
            message
        );
        const botMessage: CreateMessage = {
            chat_id: chatId,
            content: res,
            sender: "bot",
            type: "text"
        }
        return botMessage;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}

