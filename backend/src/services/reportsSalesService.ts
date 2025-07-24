import SaleModel from '../database/models/sale.model';
import { ServiceResponse } from '../interfaces/services';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Op } from 'sequelize';
import { zonedTimeToUtc } from 'date-fns-tz';
import { SalesReportSummary } from '../interfaces/reportsSales';
import { normalizePaymentMethod, validateDateFilters } from '../utils/validations';
import {
  processOperatorAggregation,
  processPaymentAggregation,
  processProductAggregation,
} from '../utils/utilsGenerateReportsSales';

const timeToUtc = 'America/Sao_Paulo';

async function fetchSalesData(filters: { startDate: string; endDate: string }) {
  return await SaleModel.findAll({
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
        attributes: ['id', 'name', 'price', 'costPrice'],
        through: { attributes: ['quantity'] },
      },
      {
        model: UserModel,
        as: 'operator',
        attributes: ['username'],
      },
    ],
  });
}

function initializeAggregators() {
  return {
    totalSales: 0,
    grossRevenue: 0,
    grossProfit: 0,
    salesByPaymentMethod: { pix: 0, cash: 0, card: 0, promissoryNote: 0 },
    salesByOperator: {},
    productSales: {},
  };
}

function calculateSaleProfit(products: any[]): number {
  let profit = 0;

  for (const prod of products) {
    const cost = Number(prod.costPrice ?? 0);
    const price = Number(prod.price ?? 0);
    const quantity = Number(prod.dataValues.sales_products.dataValues.quantity ?? 0);

    const unitProfit = price - cost;
    profit += unitProfit * quantity;
  }

  return profit;
}

function processSale(sale: any, aggregators: any) {
  const { salesByPaymentMethod, salesByOperator, productSales } = aggregators;
  const saleData = sale.dataValues;
  const operatorName = saleData.operator?.username || 'Desconhecido';
  const method = normalizePaymentMethod(saleData.paymentMethod);
  const total = Number(saleData.total);

  aggregators.totalSales++;
  aggregators.grossRevenue += total;

  // Calcular lucro bruto da venda
  const saleProfit = calculateSaleProfit(saleData.products || []);
  aggregators.grossProfit += saleProfit;

  const opData = processOperatorAggregation(operatorName, total, salesByOperator);
  processPaymentAggregation(method, total, salesByPaymentMethod, opData.paymentBreakdown);
  processProductAggregation(saleData.products || [], productSales);
}

function buildResponse(aggregators: any): SalesReportSummary {
  return {
    totalSales: aggregators.totalSales,
    grossRevenue: Number(aggregators.grossRevenue.toFixed(2)),
    grossProfit: Number(aggregators.grossProfit.toFixed(2)),

    salesByPaymentMethod: {
      pix: Number(aggregators.salesByPaymentMethod.pix.toFixed(2)),
      cash: Number(aggregators.salesByPaymentMethod.cash.toFixed(2)),
      card: Number(aggregators.salesByPaymentMethod.card.toFixed(2)),
      promissoryNote: Number(aggregators.salesByPaymentMethod.promissoryNote.toFixed(2)),
    },
    salesByOperator: Object.values(aggregators.salesByOperator).map((op: any) => ({
      operator: op.operator,
      totalSales: op.totalSales,
      revenue: Number(op.revenue.toFixed(2)),
      paymentBreakdown: {
        pix: Number(op.paymentBreakdown.pix.toFixed(2)),
        cash: Number(op.paymentBreakdown.cash.toFixed(2)),
        card: Number(op.paymentBreakdown.card.toFixed(2)),
        promissoryNote: Number(op.paymentBreakdown.promissoryNote.toFixed(2)),
      },
    })),
  };
}

async function generateReportByDate(filters: {
  startDate: string;
  endDate: string;
}): Promise<ServiceResponse<SalesReportSummary>> {
  const validation = validateDateFilters(filters);
  if (!validation) return validation as unknown as ServiceResponse<SalesReportSummary>;

  const allSales = await fetchSalesData(filters);

  const aggregators = initializeAggregators();

  for (const sale of allSales) {
    processSale(sale, aggregators);
  }

  const data = buildResponse(aggregators);

  return { status: 'OK', data };
}

export default {
  generateReportByDate,
};
