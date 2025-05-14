import Product from "./product";

export interface Sale {
  id?: number;
  clientId: number;
  clientName: string;
  userOperator: string;
  paymentMethod: string;
  date: Date;
  products: Product[];
  totalProducts: number;
  total: number;
}
