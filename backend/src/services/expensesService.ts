/* eslint-disable max-lines-per-function */
import ExpenseModel, { ExpenseSequelizeModel } from '../database/models/expense.model';
import Expense, { ExpenseFilters, ReportExpense } from '../interfaces/Expense';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';
import { Op, WhereOptions } from 'sequelize';

function sanitizeFilters(filters: ExpenseFilters): ExpenseFilters {
  const cleanFilters = { ...filters };
  Object.entries(cleanFilters).forEach(([key, value]) => {
    if (value === 'undefined') {
      (cleanFilters as any)[key] = undefined;
    }
  });
  return cleanFilters;
}

function buildWhereClause(filters: ExpenseFilters): WhereOptions {
  const where: any = {};
  const isValidDate = (d: string | undefined) => !!d && d.trim() !== '' && !isNaN(Date.parse(d));

  if (isValidDate(filters.startDate) && isValidDate(filters.endDate)) {
    where.datePayment = {
      [Op.between]: [new Date(filters.startDate!), new Date(filters.endDate!)],
    };
  }

  if (filters.supplier) {
    where.supplier = { [Op.like]: `%${filters.supplier}%` };
  }

  if (filters.status) {
    where.status = filters.status;
  }

  return where;
}

async function getAllExpenses(
  page: number,
  limit: number,
  filters: ExpenseFilters
): Promise<ServiceResponse<PaginatedResponse<ExpenseSequelizeModel>>> {
  await updateDelayedExpenses();
  const offset = (page - 1) * limit;
  const sanitizedFilters = sanitizeFilters(filters);
  const where = buildWhereClause(sanitizedFilters);

  const sortBy = sanitizedFilters.sortBy || 'date_payment';
  const sortOrder = sanitizedFilters.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  const { rows, count } = await ExpenseModel.findAndCountAll({
    where,
    offset,
    limit,
    order: [[sortBy, sortOrder]],
  });

  return {
    status: 'OK',
    data: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    },
  };
}

async function createExpense(expense: Expense): Promise<ServiceResponse<ExpenseSequelizeModel>> {
  if (!expense.datePayment || !expense.supplier || !expense.value) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Campos obrigatórios ausentes: dataPagamento, fornecedor ou valor' },
    };
  }

  if (isNaN(expense.value) || expense.value <= 0) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Valor deve ser um número positivo' },
    };
  }

  expense.status = 'Pendente';

  const newExpense = await ExpenseModel.create(expense);
  return {
    status: 'OK',
    data: newExpense,
  };
}

async function deleteExpense(id: number): Promise<ServiceResponse<void>> {
  if (isNaN(id) || id <= 0) {
    return { status: 'BAD_REQUEST', data: { message: 'ID inválido' } };
  }
  const expense = await ExpenseModel.findByPk(id);
  if (!expense) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Despesa não encontrada' },
    };
  }

  await expense.destroy();
  return {
    status: 'NO_CONTENT',
    data: undefined,
  };
}

async function updateExpense(
  id: number,
  expenseData: Partial<Expense>
): Promise<ServiceResponse<ExpenseSequelizeModel>> {
  if (isNaN(id) || id <= 0) {
    return { status: 'BAD_REQUEST', data: { message: 'ID inválido' } };
  }
  const expense = await ExpenseModel.findByPk(id);
  if (!expense) {
    return { status: 'NOT_FOUND', data: { message: 'Despesa não encontrada' } };
  }
  const updatedExpense = await expense.update(expenseData);
  return {
    status: 'OK',
    data: updatedExpense,
  };
}

async function updateDelayedExpenses() {
  const now = new Date();
  const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  await ExpenseModel.update(
    { status: 'Atrasado' },
    {
      where: {
        status: { [Op.ne]: 'Pago' },
        datePayment: { [Op.lt]: hoje },
      },
    }
  );
}

async function getExpensesReport(startDate: string, endDate: string)
  : Promise<ServiceResponse<ReportExpense>> {
  if (!startDate || !endDate) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'É necessário informar a data para o relatório' },
    };
  }

  const where: WhereOptions = {
    datePayment: {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    },
  };

  const expenses = await ExpenseModel.findAll({ where });

  const totalValue = expenses.reduce((sum, e) => sum + Number(e.dataValues.value), 0);

  const totalByStatus = {
    pago: 0,
    pendente: 0,
    atrasado: 0,
  };

  const supplierMap: Record<string, number> = {};

  for (const expense of expenses) {
    const { status, value, supplier } = expense.dataValues;
    const amount = Number(value);

    // Agrupar por status
    const key = status?.toLowerCase() as keyof typeof totalByStatus;
    if (key in totalByStatus) {
      totalByStatus[key] += amount;
    }

    // Agrupar por fornecedor
    if (supplier) {
      supplierMap[supplier] = (supplierMap[supplier] || 0) + amount;
    }
  }

  const totalBySupplier = Object.entries(supplierMap).map(([supplier, total]) => ({
    supplier,
    total,
  }));

  const report: ReportExpense = {
    totalValue,
    totalByStatus,
    totalBySupplier,
  };

  return {
    status: 'OK',
    data: report,
  };
}


export default {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpensesReport,
};
