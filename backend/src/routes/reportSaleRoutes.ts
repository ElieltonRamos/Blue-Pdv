import { Router } from 'express';
import reportSaleController from '../controllers/reportsSalesController';

const reportSaleRouter = Router();

reportSaleRouter.get('/', reportSaleController.generateReportByDate);

export default reportSaleRouter;