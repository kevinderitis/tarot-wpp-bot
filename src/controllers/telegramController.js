import { bot } from '../bot-telegram/telegram-bot.js';

export const tgWebhook = (req, res) => {
    let body = req.body;
    bot.processUpdate(body);
    res.sendStatus(200);
}