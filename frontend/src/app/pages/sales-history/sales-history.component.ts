import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Sale } from '../../interfaces/sale';
import { ModalSalesNoteComponent } from '../../components/modal-sales-note/modal-sales-note.component';
import { SalesService } from '../../services/sales.service';
import { alertError } from '../../components/alerts/custom-alerts';

@Component({
  selector: 'app-sales-history',
  imports: [ModalSalesNoteComponent, PaginatorComponent],
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

  private router = inject(Router);
  private salesService = inject(SalesService);

  ngOnInit() {
    this.getSales(this.page, this.limit);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  getSales(page: number, limit: number) {
    this.salesService.getSales(page, limit).subscribe({
      next: (response) => {
        this.listSales = response.data;
        this.totalItems = response.total;
        this.page = response.page;
        this.limit = response.limit;
        this.totalPages = response.totalPages;
      },
      error: (e) => {
        alertError(`Erro ao buscar vendas: ${e.error.message}`);
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
