import BotModel from "../domains/models/bot.model";
import { Bot, CreateBot } from "../interfaces";
import { Schema } from 'mongoose';

export const create = async (bot: CreateBot, createBy:Schema.Types.ObjectId): Promise<Bot> => {
    console.log("aca esta el peo", bot)
    const newBot = await BotModel.create({createBy, ...bot});
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