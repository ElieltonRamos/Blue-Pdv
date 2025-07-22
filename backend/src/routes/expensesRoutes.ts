import { Router } from 'express';
import expensesController from '../controllers/expensesController';

const expensesRoutes = Router();

expensesRoutes.get('/', expensesController.getAllExpenses);
expensesRoutes.post('/', expensesController.createExpense);
expensesRoutes.patch('/update/:id', expensesController.updateExpense);
expensesRoutes.delete('/delete/:id', expensesController.deleteExpense);
// expensesRoutes.get('/reports', expensesController.getExpensesReport);

export default expensesRoutes;