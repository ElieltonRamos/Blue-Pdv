import { Router } from 'express';
import reportSaleController from '../controllers/reportsSalesController';

const reportSaleRouter = Router();

reportSaleRouter.get('/sales', reportSaleController.generateReportByDate);

export default reportSaleRouter;