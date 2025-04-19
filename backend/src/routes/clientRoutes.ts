import { Router } from 'express';
import clientController from '../controllers/clientController';

const clientRoutes = Router();

clientRoutes.post('/client/register', clientController.register);

export default clientRoutes;