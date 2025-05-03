/* eslint-disable max-lines-per-function */
import SaleModel from '../database/models/sale.model';
import SalesProductsModel from '../database/models/sales.products.model';
import { AllSalesResponse, Sale } from '../interfaces/sale';
import { ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';

async function create(sale: Sale): Promise<ServiceResponse<Sale>> {
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

async function getAll(page: number, pageSize: number): Promise<ServiceResponse<AllSalesResponse>> {
  const paramsValidation = isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1;

  if (paramsValidation) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os parâmetros page e pageSize devem ser números' },
    };
  }

  const offset = (page - 1) * pageSize;

  const { count, rows: sales } = await SaleModel.findAndCountAll({
    distinct: true,
    include: [
      {
        model: ProductModel,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
    limit: pageSize,
    offset: offset,
  });

  if (!sales || sales.length === 0) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: 'Erro ao buscar vendas, verique a paginação' },
    };
  }

  return {
    status: 'OK',
    data: {
      totalResults: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      sales,
    },
  };
}

async function getById(id: number): Promise<ServiceResponse<Sale>> {
  if (isNaN(id) || id < 1) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'O parâmetro id deve ser um número' },
    };
  }
  const sale = await SaleModel.findByPk(id, {
    include: [
      {
        model: ProductModel,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
  });

  if (!sale) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Venda não encontrada' },
    };
  }

  return {
    status: 'OK',
    data: sale.dataValues,
  };
}

async function getSalesByUser(id: number, page: number, pageSize: number)
  : Promise<ServiceResponse<AllSalesResponse>> {
  const paramsValidation = isNaN(id) || isNaN(page) || isNaN(pageSize) || id < 1 || page < 1 || pageSize < 1;

  if (paramsValidation) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os parâmetros id, page e pagesize devem ser números' },
    };
  }

  const offset = (page - 1) * pageSize;

  const { count, rows: sales } = await SaleModel.findAndCountAll({
    where: { userOperator: id },
    distinct: true,
    include: [
      {
        model: ProductModel,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
    limit: pageSize,
    offset,
  });

  if (!sales || sales.length === 0) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: 'Erro ao buscar vendas, verique a paginação' },
    };
  }

  return {
    status: 'OK',
    data: {
      totalResults: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      sales,
    },
  };
}

async function getSalesByClient(id: number, page: number, pageSize: number)
  : Promise<ServiceResponse<AllSalesResponse>> {
  const paramsValidation = isNaN(id) || isNaN(page) || isNaN(pageSize) || id < 1 || page < 1 || pageSize < 1;

  if (paramsValidation) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os parâmetros id, page e pagesize devem ser números' },
    };
  }

  const offset = (page - 1) * pageSize;

  const { count, rows: sales } = await SaleModel.findAndCountAll({
    where: { clientId: id },
    distinct: true,
    include: [
      {
        model: ProductModel,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
    limit: pageSize,
    offset,
  });

  if (!sales || sales.length === 0) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: 'Erro ao buscar vendas, verique a paginação' },
    };
  }

  return {
    status: 'OK',
    data: {
      totalResults: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      sales,
    },
  };
}


export default {
  create,
  getAll,
  getById,
  getSalesByUser,
  getSalesByClient,
};
