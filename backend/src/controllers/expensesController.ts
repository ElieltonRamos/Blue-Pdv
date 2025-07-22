import { Request, Response } from 'express';
import mapHttpStatus from '../utils/mapStatusHttp';
import expensesService from '../services/expensesService';

const internalMsgError = 'Internal server error';

async function getAllExpenses(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const filters = {
      sortBy: (req.query.sortBy as string) || 'datePayment',
      sortOrder: req.query.sortOrder ? String(req.query.sortOrder) : 'asc',
      supplier: req.query.supplier as string,
      status: req.query.status as 'Pago' | 'Pendente' | 'Atrasado' | '',
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
    };
    const { status, data } = await expensesService.getAllExpenses(page, limit, filters);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error get report:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function updateExpense(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const expenseData = req.body;

    const { status, data } = await expensesService.updateExpense(Number(id), expenseData);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error updating expense:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function deleteExpense(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await expensesService.deleteExpense(Number(id));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error deleting expense:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function createExpense(req: Request, res: Response) {
  try {
    const { supplier, description, value, datePayment } = req.body;
    const { status, data } = await expensesService.createExpense({
      supplier,
      description,
      value,
      datePayment,
      status: 'Pendente',
    });
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error deleting expense:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  getAllExpenses,
  updateExpense,
  deleteExpense,
  createExpense,
};
