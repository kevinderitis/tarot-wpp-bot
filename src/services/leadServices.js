import { getLeadByChatId, createLead, getAllLeads, getLastPendingLeads } from "../dao/leadDAO.js";

export const formatNumber = number => {
    return `${number}@c.us`;
}

export const formatChatId = chatId => {
    let number = chatId.split("@")[0];
    return number;
}

export const createResponse = async chatId => {
    let number;
    let response;
    let text;
    try {
        console.log(`Buscando lead chatId:  ${chatId}`);
        let lead = await getLeadByChatId(chatId);
        if (lead) {
            number = lead.clientPhone;
            text = 'Veo que ya te comunicaste anteriormente. Te envio el contacto de tu cajero para que te pongas en contacto.';
        } else {
            let clientData = await getNextClient();
            await createLeadService(chatId, clientData.phoneNumber);
            number = clientData.phoneNumber;
            text = `¡Hola! 👋 ¿Estas listo para jugar? Para darte la mejor atención, tenés un cajero personal para hablar con vos. Acá te envío el numero. ¡Mucha suerte! 🍀`;
        }

        response = {
            formated: formatNumber(number),
            number,
            text
        };

        return response;
    } catch (error) {
        throw error;
    }

}

export const createLeadService = async (chatId, clientPhone) => {
    try {
        let newLead = await createLead(chatId, clientPhone);
        return newLead;
    } catch (error) {
        throw error;
    }
}

export const getLeads = async filter => {
    try {
        let leads = await getAllLeads(filter);
        return leads;
    } catch (error) {
        throw error;
    }
}

export const getLastPendingLeadsService = async () => {
    try {
        let leads = await getLastPendingLeads();
        return leads;
    } catch (error) {
        throw error;
    }
}

export const getLeadByChatIdService = async chatId => {
    try {
        let leads = await getLeadByChatId(chatId);
        return leads;
    } catch (error) {
        throw error;
    }
}
