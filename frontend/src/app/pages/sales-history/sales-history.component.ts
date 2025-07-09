import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Sale } from '../../interfaces/sale';
import { ModalSalesNoteComponent } from '../../components/modal-sales-note/modal-sales-note.component';
import { SalesService } from '../../services/sales.service';
import { alertError } from '../../components/alerts/custom-alerts';
import { FormsModule } from '@angular/forms';
import User from '../../interfaces/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sales-history',
  imports: [FormsModule, ModalSalesNoteComponent, PaginatorComponent],
  templateUrl: './sales-history.component.html',
})
export class SalesHistoryComponent {
  totalItems = 0;
  limit = 10;
  page = 1;
  totalPages = 0;
  listSales: Sale[] = [];
  showSaleModal = false;
  saleSelected: Sale | null = null;

  startDate: string | null = null;
  endDate: string | null = null;
  filterId: string = '';
  filterClient: string = '';
  filterOperator: string = '';
  filterMethod: string = '';
  operators: User[] = [];

  private router = inject(Router);
  private userService = inject(LoginService);
  private salesService = inject(SalesService);

  ngOnInit() {
    this.getOperators();

    const today = new Date();
    const localDate = today.toLocaleDateString('sv-SE');
    this.startDate = localDate;
    this.endDate = localDate;

    this.getSales(this.page, this.limit);
  }

  getOperators() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.operators = response;
      },
      error: (e) => {
        alertError(
          `Erro ao buscar operadores: ${e.error?.message || 'Erro inesperado.'}`
        );
      },
    });
  }

  applyDateFilter(): void {
    this.page = 1; // Reinicia para a primeira página
    this.getSales(this.page, this.limit);
  }

  clearDateFilter(): void {
    this.startDate = null;
    this.endDate = null;
    this.filterId = '';
    this.filterClient = '';
    this.filterOperator = '';
    this.filterMethod = '';
    this.page = 1;
    this.getSales(this.page, this.limit);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  getSales(page: number, limit: number): void {
    const filters: any = {
      id: this.filterId?.trim() || undefined,
      startDate: this.startDate || undefined,
      endDate: this.endDate || undefined,
      client: this.filterClient?.trim() || undefined,
      operator: this.filterOperator?.trim() || undefined,
      paymentMethod: this.filterMethod?.trim() || undefined,
    };

    this.salesService.getSales(page, limit, filters).subscribe({
      next: (response) => {
        this.listSales = response.data;
        this.totalItems = response.total;
        this.page = response.page;
        this.limit = response.limit;
        this.totalPages = response.totalPages;
      },
      error: (e) => {
        alertError(
          `Erro ao buscar vendas: ${e.error?.message || 'Erro inesperado.'}`
        );
      },
    });
  }

  closeSaleModal() {
    this.saleSelected = null;
    this.showSaleModal = false;
  }

  openSaleModal(sale: Sale) {
    this.saleSelected = sale;
    this.showSaleModal = true;
  }
}
