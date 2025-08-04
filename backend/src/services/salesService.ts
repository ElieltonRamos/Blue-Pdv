/* eslint-disable max-lines-per-function */
import SaleModel from '../database/models/sale.model';
import SalesProductsModel from '../database/models/sales.products.model';
import { Sale } from '../interfaces/sale';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { validationCreateSale, validationsParams } from '../utils/validations';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import ClientModel from '../database/models/client.model';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';

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

async function findSalesByFilters(
  filters: {
    id?: string;
    startDate?: string;
    endDate?: string;
    client?: string;
    operator?: string;
    paymentMethod?: string;
  } = {},
  page: number,
  pageLimit: number
): Promise<PaginatedResponse<Sale>> {
  const offset = (page - 1) * pageLimit;

  const where: WhereOptions = {};

  // Filtro por ID da venda
  if (filters.id) {
    where['id'] = filters.id;
  }

  // Filtro por data
  if (filters.startDate || filters.endDate) {
    where['date'] = {};

    if (filters.startDate) {
      // Converte a data local (ex: '2025-07-07') para UTC começando o dia
      const startDate = zonedTimeToUtc(filters.startDate + ' 00:00:00', 'America/Sao_Paulo');
      where['date'][Op.gte] = startDate;
    }

    if (filters.endDate) {
      // Converte o fim do dia local para UTC
      const endDate = zonedTimeToUtc(filters.endDate + ' 23:59:59.999', 'America/Sao_Paulo');
      where['date'][Op.lte] = endDate;
    }
  }

  // Filtro por método de pagamento
  if (filters.paymentMethod) {
    where['payment_method'] = filters.paymentMethod;
  }

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
      where: filters.operator
        ? Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('operator.username')), {
          [Op.like]: `%${filters.operator.toLowerCase()}%`,
        })
        : undefined,
      required: !!filters.operator,
    },
    {
      model: ClientModel,
      as: 'client',
      attributes: ['name'],
      where: filters.client ? { name: { [Op.like]: `%${filters.client}%` } } : undefined,
      required: !!filters.client,
    },
  ];

  const { count, rows: sales } = await SaleModel.findAndCountAll({
    where,
    distinct: true,
    include,
    limit: pageLimit,
    offset,
    order: [['date', 'DESC']],
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

async function getAll(
  page: number,
  pageLimit: number,
  filters: {
    id?: string;
    startDate?: string;
    endDate?: string;
    client?: string;
    operator?: string;
    paymentMethod?: string;
  } = {}
): Promise<ServiceResponse<PaginatedResponse<Sale>>> {
  const validation = validationsParams(1, page, pageLimit);
  if (validation) return validation;

  const res = await findSalesByFilters(filters, page, pageLimit);

  return {
    status: 'OK',
    data: res,
  };
}

async function create(sale: Sale): Promise<ServiceResponse<Sale>> {
  const validationSale = validationCreateSale(sale);
  if (validationSale) return validationSale;
  const allowedMethods = ['Cartão', 'Dinheiro', 'Pix', 'Notinha'];

  if (!allowedMethods.includes(sale.paymentMethod)) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Método de pagamento inválido, tente: Cartão, Dinheiro, Pix, Notinha' },
    };
  }

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

async function markAsReceived(salesId: number[]): Promise<ServiceResponse<Sale>> {
  if (!salesId || !Array.isArray(salesId) || salesId.length === 0) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'E necessario enviar uma lista de ID das vendas a serem recebidas' },
    };
  }

  const updatedSales = await SaleModel.update({ isPaid: true }, { where: { id: salesId } });

  if (updatedSales[0] === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Nenhuma venda encontrada para dar baixa' } };
  }

  return {
    status: 'OK',
    data: { message: 'Vendas atualizadas com sucesso' },
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

export default {
  create,
  getAll,
  markAsReceived,
  getById,
};
