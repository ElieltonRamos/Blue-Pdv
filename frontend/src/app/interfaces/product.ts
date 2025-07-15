export default interface Product {
  id?: number;
  name: string;
  code: number;
  price: number;
  quantity?: number;
  sales_products?: {
    quantity: number;
  };
};

export interface GetSugestionCode {
  code: number;
}
