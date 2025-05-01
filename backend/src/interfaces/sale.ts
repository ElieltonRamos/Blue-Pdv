import Product from './product';

export interface Sale {
  id?: number;
  clientId: number;
  userOperator: string;
  paymentMethod: string;
  date: string;
  products?: Product[];
  totalProducts: number;
  total: number;
}