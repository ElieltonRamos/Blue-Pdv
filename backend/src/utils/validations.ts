import { Model } from 'sequelize';
import { Sale } from '../interfaces/sale';
import { ServiceResponse } from '../interfaces/services';

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
  const requiredFields: (keyof Sale)[] = [
    'clientId',
    'userOperator',
    'paymentMethod',
    'date',
    'totalProducts',
    'total',
    'products',
  ];

  const missingFields = requiredFields.filter((field: keyof Sale) => !sale[field]);

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