import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { PaginatedResponse } from '../interfaces/paginator';
import Expense, { ExpenseFilters } from '../interfaces/Expense';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private apiUrl = environment.apiUrl;

  constructor(private client: HttpClient) {}

  getAllExpenses(
    page: number,
    limit: number,
    filters: ExpenseFilters = {},
    sortBy: string = '',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Observable<PaginatedResponse<Expense>> {
    const params: any = {
      page,
      limit,
      sortBy,
      sortOrder,
      supplier: filters.supplier || undefined,
      status: filters.status || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    };

    return this.client.get<PaginatedResponse<Expense>>(`${this.apiUrl}/expenses`, { params });
  }
  deleteExpense(id: number): Observable<void> {
    return this.client.delete<void>(`${this.apiUrl}/expenses/delete/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.client.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.client.patch<Expense>(`${this.apiUrl}/expenses/update/${expense.id}`, expense);
  }
}
