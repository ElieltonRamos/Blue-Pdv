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

async function getAll(req: Request, res: Response) {
  try {
    const { page, pagesize } = req.query;
    const { status, data } = await salesService.getAll(Number(page), Number(pagesize));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await salesService.getById(Number(id));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sale by ID:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getSalesByUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { page, pagesize } = req.query;
    const { status, data } = await salesService.getSalesByUser(Number(id), Number(page), Number(pagesize));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by user:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getSalesByClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { page, pagesize } = req.query;
    const { status, data } = await salesService.getSalesByClient(Number(id), Number(page), Number(pagesize));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  create,
  getAll,
  getById,
  getSalesByUser,
  getSalesByClient,
};