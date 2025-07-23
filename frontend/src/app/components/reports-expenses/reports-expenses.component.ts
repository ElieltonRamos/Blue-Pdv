import { Component, inject } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';
import { alertError } from '../alerts/custom-alerts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-expenses',
  imports: [FormsModule],
  templateUrl: './reports-expenses.component.html',
})
export class ReportsExpensesComponent {
  private expenseService = inject(ExpensesService);
  private router = inject(Router);
  startDate: string = '';
  endDate: string = '';
  isLoading = false;

  report = {
    totalValue: 0,
    totalByStatus: {
      Pago: 0,
      Pendente: 0,
      Atrasado: 0,
    },
    totalBySupplier: [] as { supplier: string; total: number }[],
  };

  ngOnInit() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const localDate = now.toISOString().split('T')[0];

    this.startDate = localDate;
    this.endDate = localDate;
  }

  getFullDate(): string {
    if (!this.startDate || !this.endDate) return '';

    const start = new Date(`${this.startDate}T00:00`);
    const end = new Date(`${this.endDate}T00:00`);
    const formatter = new Intl.DateTimeFormat('pt-BR');

    return `${formatter.format(start)} - ${formatter.format(end)}`;
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  setToday() {
    const today = new Date().toISOString().slice(0, 10);
    this.startDate = today;
    this.endDate = today;
  }

  setThisMonth() {
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);
  }

  async generateReport() {
    this.isLoading = true;
    this.expenseService
      .getExpensesReport(this.startDate, this.endDate)
      .subscribe({
        next: (response) => {
          this.report = response;
          this.isLoading = false;
        },
        error: (e) => {
          alertError(`Erro ao gerar relatório de despesas: ${e.error.message}`);
          this.isLoading = false;
        },
      });
  }
}
