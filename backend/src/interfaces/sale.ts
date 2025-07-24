import { Model } from 'sequelize';
import Product from './product';

export interface Sale {
  id?: number;
  clientId: number;
  userOperator: string;
  paymentMethod: string;
  date: Date;
  products?: Product[];
  totalProducts: number;
  total: number;
  isPaid: boolean;
  client?: { name: string };
  formattedDate?: string;
  operator?: { username: string };
}

export interface AllSalesResponse {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  sales: Model<Sale>[];
}
