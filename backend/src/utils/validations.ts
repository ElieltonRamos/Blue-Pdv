import { Model } from 'sequelize';
import { Sale } from '../interfaces/sale';
import { ServiceResponse } from '../interfaces/services';
import { isValid, parseISO } from 'date-fns';

type ErrorResponse = ServiceResponse<{ message: string }>;
type ValidationResponse = false | ErrorResponse;

export function validationsParams(id: number, page: number, pageSize: number): ValidationResponse {
  const paramsValidation = isNaN(id) || isNaN(page) || isNaN(pageSize) || id < 1 || page < 1 || pageSize < 1;

  if (paramsValidation) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os parâmetros id, page e pagesize devem ser números' },
    };
  }
  return false;
}

export function validationFindSales(sales: Model<Sale>[]): ValidationResponse {
  if (!sales || sales.length === 0) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: 'Erro ao buscar vendas, verique a paginação' },
    };
  }
  return false;
}

export function validationCreateSale(sale: Sale): ValidationResponse {
  const requiredFields: (keyof Sale)[] = ['clientId', 'userOperator', 'paymentMethod',
    'date', 'totalProductsWithoutDiscount', 'total', 'products', 'isPaid'];

  const missingFields = requiredFields.filter((field: keyof Sale) => {
    const value = sale[field];
    if (typeof value === 'boolean') return false;
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return {
      status: 'BAD_REQUEST',
      data: {
        message: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`,
      },
    };
  }

  if (!Array.isArray(sale.products) || sale.products.length === 0) {
    return {
      status: 'BAD_REQUEST',
      data: {
        message: 'E necessário informar pelo menos um produto na venda',
      },
    };
  }

  return false;
}

export function normalizePaymentMethod(
  value: string | null | undefined
): 'pix' | 'cash' | 'card' | 'promissoryNote' | null {
  if (!value) return null;

  const normalized = value.toLowerCase();

  if (normalized.includes('pix')) return 'pix';
  if (normalized.includes('notinha')) return 'promissoryNote';
  if (normalized.includes('dinheiro') || normalized.includes('cash')) return 'cash';
  if (normalized.includes('cartão') || normalized.includes('cartao') 
    || normalized.includes('card')) return 'card';

  return null;
}

export function validateDateFilters(filters: { startDate: string; endDate: string })
  : ServiceResponse<string> {
  if (!filters.startDate || !filters.endDate) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'É necessário informar a data inicial e final para o relatório' },
    };
  }

  const parsedStart = parseISO(filters.startDate);
  const parsedEnd = parseISO(filters.endDate);

  if (!isValid(parsedStart) || !isValid(parsedEnd)) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Formato de data inválido. Use o padrão ISO: YYYY-MM-DD.' },
    };
  }

  return {
    status: 'OK',
    data: { message: 'null' },
  };
}
