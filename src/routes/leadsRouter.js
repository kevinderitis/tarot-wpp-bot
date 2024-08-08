import { Router } from 'express';
import { getAllLeads } from '../controllers/leadsController.js';

const leadsRouter = Router();

leadsRouter.get('/all', getAllLeads);


export default leadsRouter;