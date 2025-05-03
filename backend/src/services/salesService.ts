import SaleModel from '../database/models/sale.model';
import SalesProductsModel from '../database/models/sales.products.model';
import { AllSalesResponse, Sale } from '../interfaces/sale';
import { ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { validationCreateSale, validationFindSales, validationsParams } from '../utils/validations';
import { Op, WhereOptions } from 'sequelize';

const include = [
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
];

async function findSales(where: WhereOptions = {}, page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const { count, rows: sales } = await SaleModel.findAndCountAll({
    where,
    distinct: true,
    include,
    limit: pageSize,
    offset,
  });

  return {
    totalResults: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    sales,
  };
}

async function create(sale: Sale): Promise<ServiceResponse<Sale>> {
  const validationSale = validationCreateSale(sale);
  if (validationSale) return validationSale;

  const newSale = await SaleModel.create(sale);

  if (!newSale) return { status: 'SERVER_ERROR', data: { message: 'Erro ao criar a venda' } };

  const saleProducts = sale.products!.map((product) => ({
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
  const validation = validationsParams(1, page, pageSize);
  if (validation) return validation;

  const res = await findSales({}, page, pageSize);

  const salesExists = validationFindSales(res.sales);
  if (salesExists) return salesExists;

  return {
    status: 'OK',
    data: res,
  };
}

async function getById(id: number): Promise<ServiceResponse<Sale>> {
  if (isNaN(id) || id < 1) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'O parâmetro id deve ser um número' },
    };
  }
  const sale = await SaleModel.findByPk(id, { include });

  if (!sale) return { status: 'NOT_FOUND', data: { message: 'Venda não encontrada' } };

  return {
    status: 'OK',
    data: sale.dataValues,
  };
}

async function getSalesByUser(id: number, page: number, pageSize: number)
: Promise<ServiceResponse<AllSalesResponse>> {
  const validation = validationsParams(id, page, pageSize);
  if (validation) return validation;

  const res = await findSales({ userOperator: id }, page, pageSize);

  const salesExists = validationFindSales(res.sales);
  if (salesExists) return salesExists;

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByClient(
  id: number,
  page: number,
  pageSize: number
): Promise<ServiceResponse<AllSalesResponse>> {
  const validation = validationsParams(id, page, pageSize);
  if (validation) return validation;

  const res = await findSales({ clientId: id }, page, pageSize);

  const salesExists = validationFindSales(res.sales);
  if (salesExists) return salesExists;

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByDay(
  date: string,
  page: number,
  pageSize: number,
  operatorId?: number
): Promise<ServiceResponse<AllSalesResponse>> {
  const validation = validationsParams(1, page, pageSize);
  if (validation) return validation;

  const formattedDate = new Date(date);
  const startOfDay = new Date(
    Date.UTC(formattedDate.getUTCFullYear(), formattedDate.getUTCMonth(), formattedDate.getUTCDate()));
  const endOfDay = new Date(
    Date.UTC(formattedDate.getUTCFullYear(), formattedDate.getUTCMonth(), 
      formattedDate.getUTCDate() + 1, 23, 59, 59, 999)
  );

  const filters = {
    [Op.and]: [
      ...(operatorId ? [{ userOperator: operatorId }] : []),
      { date: {[Op.between]: [startOfDay, endOfDay]} }],
  };
  const res = await findSales(filters, page, pageSize);

  const salesExists = validationFindSales(res.sales);
  if (salesExists) return salesExists;

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByMonth(
  date: string,
  page: number,
  pageSize: number,
  operatorId?: number
): Promise<ServiceResponse<AllSalesResponse>> {
  const validation = validationsParams(1, page, pageSize);
  if (validation) return validation;

  const formattedDate = new Date(date);
  const startOfMonth = new Date(Date.UTC(formattedDate.getUTCFullYear(), formattedDate.getUTCMonth(), 1));
  const endOfMonth = new Date(
    Date.UTC(formattedDate.getUTCFullYear(), formattedDate.getUTCMonth() + 1, 0, 23, 59, 59, 999)
  );

  const filters = {
    [Op.and]: [
      ...(operatorId ? [{ userOperator: operatorId }] : []),
      { date: { [Op.between]: [startOfMonth, endOfMonth] } },
    ],
  };

  const res = await findSales(filters, page, pageSize);

  const salesExists = validationFindSales(res.sales);
  if (salesExists) return salesExists;

  return {
    status: 'OK',
    data: res,
  };
}

export default {
  create,
  getAll,
  getById,
  getSalesByUser,
  getSalesByClient,
  getSalesByDay,
  getSalesByMonth,
};
