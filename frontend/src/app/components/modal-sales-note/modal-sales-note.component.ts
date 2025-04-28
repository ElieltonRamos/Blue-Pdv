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
}
