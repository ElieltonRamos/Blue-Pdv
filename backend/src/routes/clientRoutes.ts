import { Router } from 'express';
import clientController from '../controllers/clientController';

const clientRoutes = Router();

clientRoutes.get('/', clientController.getAllClients);
clientRoutes.get('/:id', clientController.getClientById);
clientRoutes.post('/register', clientController.register);

export default clientRoutes;