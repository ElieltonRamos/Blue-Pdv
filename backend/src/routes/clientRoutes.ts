import { Router } from 'express';
import clientController from '../controllers/clientController';

const clientRoutes = Router();

clientRoutes.get('/', clientController.getAllClients);
clientRoutes.get('/:id', clientController.getClientById);
clientRoutes.get('/search/:name', clientController.searchClients);
clientRoutes.post('/register', clientController.register);
clientRoutes.delete('/:id', clientController.deleteClient);

export default clientRoutes;