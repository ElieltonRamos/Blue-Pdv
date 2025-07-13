import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { FormsModule } from '@angular/forms';
import { SalesReportSummary } from '../../interfaces/reportsSales';
import { alertError } from '../../components/alerts/custom-alerts';

const summaryMock: SalesReportSummary = {
  totalSales: 0,
  grossRevenue: 0,
  salesByPaymentMethod: {
    pix: 0,
    cash: 0,
    card: 0,
  },
  salesByOperator: [],
};

@Component({
  selector: 'app-reports',
  imports: [FormsModule],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  private salesService = inject(SalesService);
  private router = inject(Router);
  report: SalesReportSummary = summaryMock;

  startDate: string = '';
  endDate: string = '';

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

  setToday() {
    const today = new Date();
    this.startDate = this.formatDate(today);
    this.endDate = this.formatDate(today);
  }

  setThisMonth() {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.startDate = this.formatDate(first);
    this.endDate = this.formatDate(last);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateReport() {
    // Chamar serviço que busca os dados e exibe ou exporta
    this.salesService
      .generateReportSales(this.startDate, this.endDate)
      .subscribe({
        next: (reportData) => {
          this.report = reportData;
        },
        error: (err) => {
          alertError(`Erro ao gerar relatório: ${err.error.message}`);
        },
      });
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
