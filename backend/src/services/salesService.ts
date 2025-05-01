/* eslint-disable max-lines-per-function */
import SaleModel from '../database/models/sale.model';
import SalesProductsModel from '../database/models/sales.products.model';
import { Sale } from '../interfaces/sale';
import { ServiceResponse } from '../interfaces/services';

async function create(sale: Sale): Promise<ServiceResponse<Sale>> {
  const requiredFields: (keyof Sale)[] = [
    'clientId', 'userOperator', 'paymentMethod', 'date', 'totalProducts', 'total', 'products'
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

  const newSale = await SaleModel.create(sale);

  if (!newSale) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Erro ao criar a venda' },
    };
  }

  const saleProducts = sale.products.map((product) => ({
    saleId: newSale.dataValues.id || 1, 
    productId: product.id || 1,
    quantity: product.quantity || 1,
  }));
  
  await SalesProductsModel.bulkCreate(saleProducts);

  return {
    status: 'CREATED',
    data: newSale.dataValues,
  };
}

export default {
  create,
};
