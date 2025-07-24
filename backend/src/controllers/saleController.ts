import { Request, Response } from 'express';
import salesService from '../services/salesService';
import mapHttpStatus from '../utils/mapStatusHttp';

const internalMsgError = 'Internal server error';

async function create(req: Request, res: Response) {
  try {
    const { clientId, userOperator, paymentMethod, date, products, totalProducts, total, isPaid } = req.body;
    const sale = { clientId, userOperator, paymentMethod, date, products, totalProducts, total, isPaid };
    const { status, data } = await salesService.create(sale);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error registering client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}
async function getAll(req: Request, res: Response) {
  try {
    const {
      page = '1',
      pageLimit = '10',
      id,
      startDate,
      endDate,
      client,
      operator,
      paymentMethod,
    } = req.query;


    const filters = {
      id: id as string,
      startDate: startDate as string,
      endDate: endDate as string,
      client: client as string,
      operator: operator as string,
      paymentMethod: paymentMethod as string,
    };

    const { status, data } = await salesService.getAll(Number(page), Number(pageLimit), filters);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function markAsReceived(req: Request, res: Response) {
  try {
    const { salesId } = req.body;
    const { status, data } = await salesService.markAsReceived(salesId);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.error('Error marking sale as received:', error);
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
    const { page = 1, pageLimit = 10 } = req.query;
    const { status, data } = await salesService.getSalesByUser(Number(id), Number(page), Number(pageLimit));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by user:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getSalesByClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { page = 1, pageLimit = 10 } = req.query;
    const { status, data } = await salesService.getSalesByClient(Number(id), Number(page), Number(pageLimit));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getSalesByDay(req: Request, res: Response) {
  try {
    const { date } = req.params;
    const { operatorId, page, pageLimit } = req.query;
    
    const { status, data } = await salesService
      .getSalesByDay(date, Number(page), Number(pageLimit), Number(operatorId),);

    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by day:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getSalesByMonth(req: Request, res: Response) {
  try {
    const { month } = req.params;
    const { page = 1, pageLimit = 10 } = req.query;
    const { status, data } = await salesService.getSalesByMonth(month, Number(page), Number(pageLimit));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching sales by month:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  create,
  getAll,
  markAsReceived,
  getById,
  getSalesByUser,
  getSalesByClient,
  getSalesByDay,
  getSalesByMonth,
};
