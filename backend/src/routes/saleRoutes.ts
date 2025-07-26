import { Router } from 'express';
import saleController from '../controllers/saleController';

const saleRouter = Router();

saleRouter.post('/', saleController.create);
saleRouter.get('/', saleController.getAll); // localhost:3001/api/sale?page=2&pagesize=2
saleRouter.get('/:id', saleController.getById);
saleRouter.patch('/received', saleController.markAsReceived);
saleRouter.get('/operator/:id', saleController.getSalesByUser);
saleRouter.get('/client/:id', saleController.getSalesByClient);
saleRouter.get('/relatory/day/:date', saleController.getSalesByDay);
saleRouter.get('/relatory/month/:month', saleController.getSalesByMonth);

export default saleRouter;