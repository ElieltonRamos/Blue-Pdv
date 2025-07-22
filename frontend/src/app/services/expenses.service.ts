import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { PaginatedResponse } from '../interfaces/paginator';
import Expense from '../interfaces/Expense';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private apiUrl = environment.apiUrl;

  constructor(private client: HttpClient) {}

  getAllExpenses(
    page: number,
    limit: number,
    filters: any = {},
    sortBy: string = '',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Observable<PaginatedResponse<Expense>> {
    const params: any = {
      page,
      limit,
      sortBy,
      sortOrder,
      ...filters,
    };

    return this.client.get<PaginatedResponse<Expense>>('/expenses', { params });
  }

  deleteExpense(id: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/expenses/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.client.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }
}
