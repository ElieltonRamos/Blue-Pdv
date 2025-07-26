export default interface Product {
  id?: number;
  name: string;
  code: number;
  price: number;
  costPrice: number;
  isMeatBovine: boolean;
  quantity?: number;
  sales_products?: {
    quantity: number;
  };
};

export interface GetSugestionCode {
  code: number;
}
