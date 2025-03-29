import BotModel from "../domains/models/bot.model";
import { Bot, CreateBot } from "../interfaces";

export const create = async (bot: CreateBot): Promise<Bot> => {
    const newBot = await BotModel.create(bot);
    return newBot;
}