import { Component, EventEmitter, Input, Output } from '@angular/core';
import Product from '../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-product',
  imports: [FormsModule],
  templateUrl: './modal-edit-product.component.html',
})
export class ModalEditProductComponent {
  @Input() item!: Product;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editedItem!: Product;

  ngOnInit() {
    this.editedItem = {...this.item};
  }

  onSave() {
    this.save.emit(this.editedItem);
  }

  onCancel() {
    this.cancel.emit();
  }

  calculateTotal() {
    return parseFloat((this.editedItem.price * (this.editedItem.quantity ?? 1)).toFixed(2));
  }
}
