import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sale } from '../../interfaces/sale';

@Component({
  selector: 'app-modal-sales-note',
  imports: [],
  templateUrl: './modal-sales-note.component.html',
})
export class ModalSalesNoteComponent {
  @Input() saleData!: Sale;
  @Output() closeModal = new EventEmitter<void>();
  date = new Date().toLocaleString();

  ngOnInit() {
    console.log(this.saleData);
  }

  getQuantity(item: any): number {
    return parseFloat(item.sales_products?.quantity ?? item.quantity ?? 0);
  }

  calculateDiscount(): number {
    const discount = this.saleData.totalProducts - this.saleData.total;
    if (discount > 0) {
      return this.formatNumber(discount);
    }
    return 0;
  }

  formatNumber(n: any): number {
    const num = Number(n);
    return isNaN(num) ? 0 : parseFloat(num.toFixed(2));
  }

  close() {
    this.closeModal.emit();
  }

  print() {
    const invoiceContent = document.getElementById('invoiceContent')!;
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow?.document.write(
      '<html><head><title>Imprimir Nota Fiscal</title></head><body>'
    );
    printWindow?.document.write(invoiceContent?.innerHTML);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }
}
