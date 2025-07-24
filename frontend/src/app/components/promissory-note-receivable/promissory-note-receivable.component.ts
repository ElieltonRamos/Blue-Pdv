import { Component, inject } from '@angular/core';
import User from '../../interfaces/user';
import { Sale } from '../../interfaces/sale';
import { Router } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ModalSalesNoteComponent } from '../modal-sales-note/modal-sales-note.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promissory-note-receivable',
  imports: [PaginatorComponent, ModalSalesNoteComponent, FormsModule],
  templateUrl: './promissory-note-receivable.component.html',
})
export class PromissoryNoteReceivableComponent {
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
  filterMethod: string = 'Notinha';
  operators: User[] = [];
  selectedSalesIds: number[] = [];

  private router = inject(Router);
  private salesService = inject(SalesService);

  get totalSelectedAmount(): number {
    const selected = this.listSales.filter(sale => this.selectedSalesIds.includes(sale.id!));
    return selected.reduce((acc, sale) => acc + Number(sale.total), 0);
  }

  toggleSelectAllEvent(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelectAll(checked);
  }

  isSelected(id: number): boolean {
    return this.selectedSalesIds.includes(id);
  }

  toggleSelection(id: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedSalesIds.includes(id)) {
        this.selectedSalesIds.push(id);
      }
    } else {
      this.selectedSalesIds = this.selectedSalesIds.filter(
        (saleId) => saleId !== id
      );
    }
  }

  onCheckboxChange(event: Event, id: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection(id, checked);
  }

  get allSelected(): boolean {
    return (
      this.listSales.length > 0 &&
      this.selectedSalesIds.length === this.listSales.length
    );
  }

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      this.selectedSalesIds = this.listSales.map((sale) => sale.id!);
    } else {
      this.selectedSalesIds = [];
    }
  }

  markSelectedAsReceived(): void {
    this.salesService.markSaleReceived(this.selectedSalesIds).subscribe({
      next: () => {
        alertSuccess('Baixa de notinhas realizada com sucesso!');
        this.selectedSalesIds = [];
        this.getSales(this.page, this.limit);
      },
      error: (e) => {
        alertError(
          `Erro ao marcar vendas como recebidas: ${e.error?.message || 'Erro inesperado.'}`
        );
      },
    });
  }

  formatNumber(n: any): number {
    const num = Number(n);
    return isNaN(num) ? 0 : parseFloat(num.toFixed(2));
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
    // this.filterMethod = 'Notinha';
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
