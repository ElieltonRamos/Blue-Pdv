/* eslint-disable max-lines-per-function */
import SaleModel from '../database/models/sale.model';
import { Sale } from '../interfaces/sale';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import ClientModel from '../database/models/client.model';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';
import { SalesReportSummary } from '../interfaces/reportsSales';

const timeToUtc = 'America/Sao_Paulo'; // Timezone for São Paulo

async function findSalesByReport(
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
      const startDate = zonedTimeToUtc(filters.startDate + ' 00:00:00', timeToUtc);
      where['date'][Op.gte] = startDate;
    }

    if (filters.endDate) {
      // Converte o fim do dia local para UTC
      const endDate = zonedTimeToUtc(filters.endDate + ' 23:59:59.999', timeToUtc);
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

async function generateReportByDate(filters: {
  startDate: string;
  endDate: string;
}): Promise<ServiceResponse<SalesReportSummary>> {
  // 1. Busca todas as vendas no período
  const allSales = await SaleModel.findAll({
    where: {
      date: {
        [Op.gte]: zonedTimeToUtc(filters.startDate + ' 00:00:00', timeToUtc),
        [Op.lte]: zonedTimeToUtc(filters.endDate + ' 23:59:59.999', timeToUtc),
      },
    },
    include: [
      {
        model: ProductModel,
        as: 'products',
        through: { attributes: ['quantity'] },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
  });

  // 2. Inicializa agregadores
  let totalSales = 0;
  let grossRevenue = 0;
  const salesByPaymentMethod = { pix: 0, cash: 0, card: 0 };
  const salesByOperator: Record<string, {
    operator: string;
    totalSales: number;
    revenue: number;
    paymentBreakdown: { pix: number; cash: number; card: number };
  }> = {};

  const productSales: Record<string, {
    name: string;
    quantity: number;
    revenue: number;
  }> = {};

  // 3. Processa vendas
  for (const sale of allSales) {
    const saleData = sale.dataValues;
    totalSales++;
    grossRevenue += saleData.total;

    // Por forma de pagamento
    const method = saleData.paymentMethod as 'pix' | 'cash' | 'card';
    if (method in salesByPaymentMethod) {
      salesByPaymentMethod[method] += saleData.total;
    }

    // Por operador
    const operatorName = saleData.operator?.username || 'Desconhecido';
    if (!salesByOperator[operatorName]) {
      salesByOperator[operatorName] = {
        operator: operatorName,
        totalSales: 0,
        revenue: 0,
        paymentBreakdown: { pix: 0, cash: 0, card: 0 },
      };
    }

    const opData = salesByOperator[operatorName];
    opData.totalSales++;
    opData.revenue += saleData.total;
    if (method in opData.paymentBreakdown) {
      opData.paymentBreakdown[method] += saleData.total;
    }

    // Produtos vendidos
    const saleProducts = saleData.products || [];
    for (const product of saleProducts) {
      const key = product.name;
      const quantity = product.quantity || 0;
      const revenue = product.price * quantity;

      if (!productSales[key]) {
        productSales[key] = {
          name: product.name,
          quantity: 0,
          revenue: 0,
        };
      }
      productSales[key].quantity += quantity;
      productSales[key].revenue += revenue;
    }
  }

  // // 4. Produto mais vendido
  // const bestSellingProduct = Object.values(productSales).sort(
  //   (a, b) => b.quantity - a.quantity
  // )[0] || { name: '', quantity: 0, revenue: 0 };

  // 5. Monta e retorna o resumo
  const data = {
    totalSales,
    grossRevenue,
    salesByPaymentMethod,
    salesByOperator: Object.values(salesByOperator),
  };

  return {
    status: 'OK',
    data,
  };
}


export default {
  findSalesByReport,
  generateReportByDate,
};
