import express from 'express';
import whatsappRouter from './src/routes/whatsappRouter.js';
import leadsRouter from './src/routes/leadsRouter.js';
import config from './src/config/config.js';

const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/whatsapp', whatsappRouter);
app.use('/leads', leadsRouter);

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

server.on('error', error => console.log(error));
