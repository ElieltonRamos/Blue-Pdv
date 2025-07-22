import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';
import Expense, { ExpenseFilters } from '../../interfaces/Expense';
import {
  alertConfirm,
  alertError,
  alertSuccess,
} from '../alerts/custom-alerts';
import { ExpensesService } from '../../services/expenses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-expenses',
  imports: [FormsModule, PaginatorComponent, CommonModule],
  templateUrl: './list-expenses.component.html',
})
export class ListExpensesComponent {
  listExpenses: Expense[] = [];
  page: number = 1;
  limit: number = 20;
  totalPages: number = 0;
  totalItems: number = 0;
  showModalEdit: boolean = false;
  sortKey: keyof Expense = 'id';
  sortAsc: boolean = true;
  editExpense: Expense = {
    id: 0,
    supplier: '',
    description: '',
    value: 0,
    datePayment: '',
    status: 'Pendente',
  };
  filter: ExpenseFilters = {
    supplier: '',
    status: '',
    startDate: '',
    endDate: '',
  };
  searchTerm: string = '';
  sortOption: string = '';
  private expenseService = inject(ExpensesService);

  ngOnInit() {
    this.getAllExpenses(this.page, this.limit);
  }

  applyFilters() {
    this.getAllExpenses(this.page, this.limit);
  }

  clearFilters() {
    this.filter = {
      supplier: '',
      status: '',
      startDate: '',
      endDate: '',
    };
    this.applyFilters();
  }

  sortBy(key: keyof Expense) {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
    this.getAllExpenses(this.page, this.limit);
  }

  getAllExpenses(page: number, limit: number) {
    const sortOrder = this.sortAsc ? 'asc' : 'desc';

    this.expenseService
      .getAllExpenses(
        page,
        limit,
        this.filter,
        this.sortKey,
        sortOrder
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.listExpenses = response.data;
          this.totalItems = response.total;
          this.page = response.page;
          this.limit = response.limit;
          this.totalPages = response.totalPages;
        },
        error: (e) => {
          alertError(`Erro ao carregar despesas: ${e.error.message}`);
        },
      });
  }

  deleteExpense(expense: Expense) {
    alertConfirm('Excluir Despesa?').then((result) => {
      if (result) {
        this.expenseService.deleteExpense(expense.id!).subscribe({
          next: () => {
            alertSuccess('Despesa excluida com sucesso');
            this.getAllExpenses(this.page, this.limit);
          },
          error: (e) => {
            alertError(`Error ao excluir Despesa: ${e.error.message}`);
          },
        });
      }
    });
  }

  closeModalEdit() {
    this.showModalEdit = false;
    this.getAllExpenses(this.page, this.limit);
  }

  markAsPaid(expense: Expense): void {
    expense.status = 'Pago';
    // Atualiza no backend
  }

  openModalEdit(expense: Expense) {
    this.editExpense = expense;
    this.showModalEdit = true;
  }
}
