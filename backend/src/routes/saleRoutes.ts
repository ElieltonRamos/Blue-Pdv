import { Router } from 'express';
import saleController from '../controllers/saleController';

const saleRouter = Router();

saleRouter.post('/', saleController.create);
saleRouter.get('/', saleController.getAll); // localhost:3001/api/sale?page=2&pagesize=2

export default saleRouter;