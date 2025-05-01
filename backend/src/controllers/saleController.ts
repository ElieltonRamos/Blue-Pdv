import { Request, Response } from 'express';
import salesService from '../services/salesService';
import mapHttpStatus from '../utils/mapStatusHttp';

const internalMsgError = 'Internal server error';

async function create(req: Request, res: Response) {
  try {
    const { clientId, userOperator, paymentMethod, 
      date, products, totalProducts, total } = req.body;
    const sale = { clientId, userOperator, paymentMethod,
      date, products, totalProducts, total };
      
    const { status, data } = await salesService.create(sale);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error registering client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  create,
};