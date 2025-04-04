import BotModel from "../domains/models/bot.model";
import { Bot, CreateBot } from "../interfaces";
import { Schema } from 'mongoose';

export const create = async (bot: CreateBot, createBy: Schema.Types.ObjectId): Promise<Bot> => {
    console.log("aca esta el peo", bot)
    const newBot = await BotModel.create({ createBy, ...bot });
    return newBot;
}

export const findById = async (id: Schema.Types.ObjectId): Promise<Bot | null> => {
    const bot = await BotModel.findById(id).populate("createBy", "name email");
    return bot;
}

export const existBot = async (name: string, url: string): Promise<boolean> => {
    const bot = await BotModel.findOne({ name, apiURL: url })
    return bot ? true : false;
}

export const updateBot = async (id: Schema.Types.ObjectId, bot: CreateBot): Promise<Bot | null> => {
    const updateBot = await BotModel.findOneAndUpdate({ _id: id }, { $set: bot }, { new: true });
    return updateBot;
}

export const findAll = async (): Promise<Bot[]> => {
    const bots = await BotModel.find().populate("createBy", "name email");
    return bots;
}

export const desactivateBot = async (id: Schema.Types.ObjectId): Promise<Bot | null> => {
    const bot = await BotModel.findByIdAndUpdate(id, { active: false }, { new: true });
    return bot;
}