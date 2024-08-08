import axios from 'axios';
import { sendSlackMessage } from './slackServices.js'
import config from '../config/config.js';
import { prepareCardName } from '../templates/cards.js';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';

// const cwd = process.cwd();
const rutaImagenes = path.join('public', 'images');

export const sendWhatsappMessage = async (to, text, phoneId) => {
    try {
        const response = await axios.post(`${config.WHATSAPP_API_URL}/${phoneId}/messages`, {
            messaging_product: 'whatsapp',
            to: to,
            text: { body: text }
        }, {
            headers: {
                'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const sendContactCard = async (to, phone, phoneId) => {
    let contact = {
        "name": {
            "first_name": "Contacto",
            "last_name": "Cajero",
            "formatted_name": "Contacto"
        },
        "phones": [
            {
                "phone": phone,
                "type": "CELL"
            }
        ]
    };

    try {
        const response = await axios.post(
            `${config.WHATSAPP_API_URL}/${phoneId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to,
                type: 'contacts',
                contacts: [contact]
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Contact card sent:', response.data);
    } catch (error) {
        console.error('Error sending contact card:', error.response ? error.response.data : error.message);
    }
};

export const healthCheck = async (msg) => {
    try {
        if (msg === '/health') {
            await sendSlackMessage('Todo nice!');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

const uploadMedia = async (imagePath, phoneId) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));
    form.append('messaging_product', 'whatsapp');

    try {
        const response = await axios.post(`${config.WHATSAPP_API_URL}/${phoneId}/media`, form, {
            headers: {
                'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'image/jpeg',
                ...form.getHeaders()
            }
        });

        return response.data.id;
    } catch (error) {
        console.log(error);
    }


};

const sendImageMessage = async (chatId, mediaId, caption, recipientPhoneId) => {
    const payload = {
        messaging_product: "whatsapp",
        to: chatId,
        type: 'image',
        image: {
            id: mediaId,
            caption: caption
        }
    };
    try {
        await axios.post(`${config.WHATSAPP_API_URL}/${recipientPhoneId}/messages`, payload, {
            headers: {
                'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }

};


const sendTypingAction = async (chatId, recipientPhoneId) => {
    const payload = {
        to: chatId,
        type: 'typing_on'
    };

    await axios.post(`${config.WHATSAPP_API_URL}/${recipientPhoneId}/media`, payload, {
        headers: {
            'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
};

export const sendTypingAndMessage = async (chatId, text, recipientPhoneId) => {
    try {
        await sendTypingAction(chatId, recipientPhoneId);

        await new Promise(resolve => setTimeout(resolve, 4000));

        await sendWhatsappMessage(chatId, text, recipientPhoneId);

    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};


export const sendMultipleMessages = (chatId, mensajes, tiempoDeEspera, recipientPhoneId) => {
    mensajes.forEach((mensaje, index) => {
        setTimeout(async () => {
            if (mensaje.carta) {
                let cardName = prepareCardName(mensaje.carta);
                const imageName = cardName ? `${cardName}.jpg` : 'defaultCard.jpg';
                const imagePath = path.join(rutaImagenes, imageName);
                try {
                    const newImagePath = imagePath.replace(/\\/g, '/');
                    const mediaId = await uploadMedia(newImagePath, recipientPhoneId);
                    await sendImageMessage(chatId, mediaId, mensaje.carta, recipientPhoneId);
                    console.log(`Image message from : ${chatId} - msg: ${mensaje.carta}`)
                    setTimeout(async () => {
                        await sendWhatsappMessage(chatId, mensaje.texto, recipientPhoneId);
                        console.log(`Multi message from : ${chatId} - msg: ${mensaje.texto}`)
                    }, 5000);
                } catch (error) {
                    console.log(error);
                }

            } else {
                let msg = mensaje.carta ? `La carta es: ${mensaje.carta} ${mensaje.texto}` : mensaje.texto;
                console.log(`Message from : ${chatId} - msg: ${msg}`)
                await sendWhatsappMessage(chatId, msg, recipientPhoneId);
            }
        }, tiempoDeEspera * index);
    });
};
