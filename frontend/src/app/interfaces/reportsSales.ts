export interface SalesReportSummary {
  totalSales: number;                    // Total number of sales
  grossRevenue: number;                 // Total revenue from all sales

  salesByPaymentMethod: {
    pix: number;
    cash: number;
    card: number;
  };

  salesByOperator: {
    operator: string;
    totalSales: number;
    revenue: number;
    paymentBreakdown: {
      pix: number;
      cash: number;
      card: number;
    };
  }[];
}
