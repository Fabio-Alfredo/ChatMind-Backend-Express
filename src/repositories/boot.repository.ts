import BotModel from "../domains/models/bot.model";
import { Bot, CreateBot } from "../interfaces";
import { Schema } from 'mongoose';

export const create = async (bot: CreateBot): Promise<Bot> => {
    const newBot = await BotModel.create(bot);
    return newBot;
}

export const findById = async (id: Schema.Types.ObjectId): Promise<Bot | null> => {
    const bot = await BotModel.findById(id);
    return bot;
}

export const existBot = async (name: string, url: string): Promise<boolean> => {
    const bot = await BotModel.findOne({ name, apiURL: url })
    return bot ? true : false;
}