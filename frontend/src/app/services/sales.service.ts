import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../interfaces/sale';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginator';
import { SalesReportSummary } from '../interfaces/reportsSales';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = environment.apiUrl;

  constructor(private client: HttpClient) {}

  createSale(sale: Sale): Observable<Sale> {
    return this.client.post<Sale>(`${this.apiUrl}/sale`, sale);
  }

  getSales(
    page: number,
    pageLimit: number,
    filters: {
      id?: string;
      startDate?: string;
      endDate?: string;
      client?: string;
      operator?: string;
      paymentMethod?: string;
    } = {}
  ): Observable<PaginatedResponse<Sale>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageLimit', pageLimit.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.client.get<PaginatedResponse<Sale>>(`${this.apiUrl}/sale`, {
      params,
    });
  }

  markSaleReceived(salesId: number[]): Observable<any> {
    return this.client.patch(`${this.apiUrl}/sale/received`, { salesId });
  }

  generateReportSales(
    startDate: string,
    endDate: string
  ): Observable<SalesReportSummary> {
    return this.client.get<SalesReportSummary>(`${this.apiUrl}/report/sales`, {
      params: {
        startDate,
        endDate,
      },
    });
  }
}
