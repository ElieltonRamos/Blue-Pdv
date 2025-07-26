import Product from "./product";

export interface Sale {
  id?: number;
  clientId: number;
  clientName: string;
  userOperator: string;
  paymentMethod: string;
  date: Date;
  products: Product[];
  totalProductsWithoutDiscount: number;
  discount: number;
  total: number;
  isPaid: boolean;
  client?: { name: string };
  operator?: { username: string };
  formattedDate?: string;
}
