import { Router } from 'express';
import clientController from '../controllers/clientController';

const clientRoutes = Router();

clientRoutes.get('/', clientController.getAllClients);
clientRoutes.get('/:id', clientController.getClientById);
clientRoutes.get('/search/:name', clientController.searchClients);
clientRoutes.post('/register', clientController.register);
clientRoutes.delete('/delete/:id', clientController.deleteClient);
clientRoutes.patch('/update/:id', clientController.updateClient);

export default clientRoutes;