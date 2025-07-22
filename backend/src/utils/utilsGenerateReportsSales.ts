export function processOperatorAggregation(operatorName: string, total: number, salesByOperator: any) {
  if (!salesByOperator[operatorName]) {
    salesByOperator[operatorName] = {
      operator: operatorName,
      totalSales: 0,
      revenue: 0,
      paymentBreakdown: { pix: 0, cash: 0, card: 0, promissoryNote: 0 },
    };
  }

  const opData = salesByOperator[operatorName];
  opData.totalSales++;
  opData.revenue += total;

  return opData;
}

export function processPaymentAggregation(
  method: string | null,
  total: number,
  salesByPaymentMethod: any,
  paymentBreakdown: any
) {
  if (method && method in salesByPaymentMethod) {
    salesByPaymentMethod[method] += total;
    paymentBreakdown[method] += total;
  }
}

export function processProductAggregation(products: any[], productSales: any) {
  for (const product of products || []) {
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
