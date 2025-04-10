import BotModel from "../domains/models/bot.model";
import { Bot, CreateBot, UpdateBot } from "../interfaces";
import { Schema } from 'mongoose';

export const create = async (bot: CreateBot, createBy: Schema.Types.ObjectId): Promise<Bot> => {
    const newBot = await BotModel.create({ createBy, ...bot });
    return newBot;
}

export const findById = async (id: string): Promise<Bot | null> => {
    const bot = await BotModel.findById(id).populate("createBy", "name email");
    return bot;
}

export const existBot = async (name: string, url: string): Promise<boolean> => {
    const bot = await BotModel.findOne({ name, apiURL: url })
    return bot ? true : false;
}

export const updateBot = async (id: string, bot: UpdateBot): Promise<Bot | null> => {
    const updateBot = await BotModel.findOneAndUpdate({ _id: id }, { $set: bot }, { new: true });
    return updateBot;
}

export const findAll = async (): Promise<Bot[]> => {
    const bots = await BotModel.find().populate("createBy", "name email");
    return bots;
}

export const desactivateBot = async (id: string): Promise<boolean> => {
    await BotModel.updateOne({ _id: id }, { $set: { isActive: false } }, { new: true });
    return true;
}