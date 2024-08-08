import { getLeads } from '../services/leadServices.js';
import moment from 'moment-timezone';


export const getAllLeads = async (req, res) => {
    try {
        let leads = await getLeads();

        let mappedLeads = leads.map(lead => ({
            chatId: lead.chatId,
            status: lead.status,
            clientPhone: lead.clientPhone,
            createdAt: moment.utc(lead.createdAt).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss')
        }));

        res.send(mappedLeads);
    } catch (error) {
        res.status(500).send(error);
    }
}