// import axios from 'axios';
// import { getAllLeads } from '../dao/leadDAO.js';
// import config from '../config/config.js';

// export const sendPostRequest = async (url, params) => {
//   try {
//     const response = await axios.post(url, params);
//     return response.data;
//   } catch (error) {
//     console.error('Error sending POST request:', error);
//   }
// };

// async function getDataAndProcess() {
//   try {
//       const data = await getAllLeads();
//       for (const item of data) {
//           const { chatId, name } = item;
//           await sendPostRequest(config.WEB_SERVICE_URL, { name, phone: chatId });
//       }
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   } finally {
//       console.log('Data sent')
//   }
// }

// getDataAndProcess();