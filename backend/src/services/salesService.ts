import SaleModel from '../database/models/sale.model';
import SalesProductsModel from '../database/models/sales.products.model';
import { Sale } from '../interfaces/sale';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { validationCreateSale, validationsParams } from '../utils/validations';
import { Op, WhereOptions } from 'sequelize';
import ClientModel from '../database/models/client.model';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  {
    model: ClientModel,
    as: 'client',
    attributes: ['name'],
  },
];

async function findSales(where: WhereOptions = {}, page: number, pageLimit: number)
: Promise<PaginatedResponse<Sale>> {
  const offset = (page - 1) * pageLimit;
  const { count, rows: sales } = await SaleModel.findAndCountAll({
    where,
    distinct: true,
    include,
    limit: pageLimit,
    offset,
  });

  const formattedSales = sales.map((sale) => {
    const data = sale.dataValues;

    return {
      ...data,
      formattedDate: format(new Date(data.date), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
    };
  });

  return {
    data: formattedSales,
    page,
    limit: pageLimit,
    total: count,
    totalPages: Math.ceil(count / pageLimit),
  };
}

async function create(sale: Sale): Promise<ServiceResponse<Sale>> {
  const validationSale = validationCreateSale(sale);
  if (validationSale) return validationSale;
  console.log('sale', sale);

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

async function getAll(page: number, pageLimit: number)
  : Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(1, page, pageLimit);
  if (validation) return validation;

  const res = await findSales({}, page, pageLimit);

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

async function getSalesByUser(id: number, page: number, pageLimit: number)
: Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(id, page, pageLimit);
  if (validation) return validation;

  const res = await findSales({ userOperator: id }, page, pageLimit);

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByClient(
  id: number,
  page: number,
  pageLimit: number
): Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(id, page, pageLimit);
  if (validation) return validation;

  const res = await findSales({ clientId: id }, page, pageLimit);

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByDay(
  date: string,
  page: number,
  pageLimit: number,
  operatorId?: number
): Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(1, page, pageLimit);
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
  const res = await findSales(filters, page, pageLimit);

  return {
    status: 'OK',
    data: res,
  };
}

async function getSalesByMonth(
  date: string,
  page: number,
  pageLimit: number,
  operatorId?: number
): Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(1, page, pageLimit);
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

  const res = await findSales(filters, page, pageLimit);

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
