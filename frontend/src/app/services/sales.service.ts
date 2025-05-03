import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../interfaces/sale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:3001/api';

  constructor( private client: HttpClient) { }

  createSale(sale: Sale): Observable<Sale> {
    return this.client.post<Sale>(`${this.apiUrl}/sale`, sale);
  }
}
