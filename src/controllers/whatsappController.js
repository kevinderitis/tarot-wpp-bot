import { sendWhatsappMessage, sendMultipleMessages } from '../services/whatsappServices.js';
import { prepareCards } from '../services/cardServices.js';

import config from '../config/config.js';
import { botMsg } from '../services/gptServices.js';

export const verifyWebhook = async (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === config.WHATSAPP_VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
};

export const processMessage = async (req, res) => {
    const body = req.body;
    try {
        if (body.object) {
            body.entry.forEach(entry => {
                entry.changes.forEach(async change => {
                    if (change.field === 'messages') {
                        const message = change.value.messages && change.value.messages[0];
                        const recipientPhoneId = change.value.metadata.phone_number_id;
                        if (message) {
                            let messageBody = message.text.body;
                            let messageFrom = message.from;
                            console.log(`Mensaje: ${messageBody}`)
                            console.log(`Numero de telefono: ${messageFrom}`)

                            if (message.from) {
                                let response = await botMsg(messageBody, messageFrom);

                                if (response === 'function') {
                                    response = await botMsg(messageBody, messageFrom);
                                }

                                let cards = prepareCards(response);
                                let delay = 20000;
                                
                                if (cards.length > 1) {
                                    sendMultipleMessages(messageFrom, cards, delay, recipientPhoneId)
                                } else {
                                    setTimeout(async () => {
                                        await sendWhatsappMessage(messageFrom, response, recipientPhoneId);
                                        console.log(`Single message from : ${messageFrom} - msg: ${response}`)
                                    }, 8000);
                                }

                            }
                        }
                    }
                });
            });

            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}
