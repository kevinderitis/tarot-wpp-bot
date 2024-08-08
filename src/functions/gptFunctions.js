import config from "../config/config.js";
import { updateLeadNameByThreadId } from "../dao/leadDAO.js";
// import { appendDataToSheet } from "../services/googleServices.js";
// import { sendPostRequest } from '../services/webServices.js';

export const executeActionWithParams = async (action, params, threadId) => {
    switch (action) {
        case 'name':
            return await saveName(threadId, params);
        case 'email':
            return await greet(...params);
        default:
            return "Action not found";
    }
};

const saveName = async (threadId, params) => {
    let name = params.name;
    try {
        let lead = await updateLeadNameByThreadId(threadId, params.name)
        // await appendDataToSheet(config.SHEET_ID, [lead.name, lead.chatId, threadId])
        // await sendPostRequest(config.WEB_SERVICE_URL, { name: lead.name, phone: lead.chatId, threadId })
        console.log('nombre guardado en db');
    } catch (error) {
        console.log('No se pudo guardar el nombre');
    }

    return `Buenisimo ${name}. Le compartí tu nombre y telefono a un asesor que va a saber darte mas información acerca de Enerflex CBD. Alguna otra pregunta que quieras hacerme? `
}

const greet = async (name) => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Hello, ${name}!`);
        }, 1000);
    });
};