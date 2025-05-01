import { Router } from 'express';
import saleController from '../controllers/saleController';

const saleRouter = Router();

saleRouter.post('/', saleController.create);

export default saleRouter;