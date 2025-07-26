import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product, { GetSugestionCode } from '../interfaces/product';
import { PaginatedResponse } from '../interfaces/paginator';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor( private client: HttpClient) { }

  getProductByCode(code: string): Observable<Product> {
    return this.client.get<Product>(`${this.apiUrl}/product/code/${code}`);
  }

  getProductByName(name: string): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.apiUrl}/product/name/${name}`);
  }

  getSugestionCode(): Observable<GetSugestionCode> {
    return this.client.get<GetSugestionCode>(`${this.apiUrl}/product/sugestion/code`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.client.post<Product>(`${this.apiUrl}/product/register`, product);
  }

  getAllProducts(page: number, pageLimit: number): Observable<PaginatedResponse<Product>> {
    return this.client.get<PaginatedResponse<Product>>(`${this.apiUrl}/product?page=${page}&pageLimit=${pageLimit}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/product/delete/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.client.patch<Product>(`${this.apiUrl}/product/update/${product.id}`, product);
  }

}
