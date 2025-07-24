export interface SalesReportSummary {
  totalSales: number;
  grossRevenue: number;
  grossProfit: number;

  salesByPaymentMethod: {
    pix: number;
    cash: number;
    card: number;
    promissoryNote: number;
  };

  salesByOperator: {
    operator: string;
    totalSales: number;
    revenue: number;
    paymentBreakdown: {
      pix: number;
      cash: number;
      card: number;
      promissoryNote: number;
    };
  }[];
}
