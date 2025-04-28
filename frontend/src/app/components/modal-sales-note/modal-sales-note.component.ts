import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sale } from '../../interfaces/sale';

@Component({
  selector: 'app-modal-sales-note',
  imports: [],
  templateUrl: './modal-sales-note.component.html',
})
export class ModalSalesNoteComponent {
  @Input() saleData!: Sale
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  print() {
    const invoiceContent = document.getElementById('invoiceContent')!;
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow?.document.write('<html><head><title>Imprimir Nota Fiscal</title></head><body>');
    printWindow?.document.write(invoiceContent?.innerHTML);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }
}
