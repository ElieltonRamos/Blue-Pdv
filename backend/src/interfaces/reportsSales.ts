export interface SalesReportSummary {
  totalSales: number;
  grossRevenue: number;

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
