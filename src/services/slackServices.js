import axios from 'axios';
import config from '../config/config.js';

export const sendSlackMessage = async msg => {
    try {
        await axios.post(config.SLACK_CHANNEL, {
            text: msg
        });
    } catch (error) {
        console.error('Error al enviar mensaje a Slack:', error.message);
        throw new Error('No se pudo enviar el mensaje a Slack');
    }
};