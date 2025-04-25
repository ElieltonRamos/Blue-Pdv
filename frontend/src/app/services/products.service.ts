import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3001/api';

  constructor( private client: HttpClient) { }

  getProductByCode(code: string): Observable<Product> {
    return this.client.get<Product>(`${this.apiUrl}/product/code/${code}`);
  }
}
