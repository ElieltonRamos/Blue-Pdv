import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import Product from '../../interfaces/product';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-modal-update-product',
  imports: [FormsModule],
  templateUrl: './modal-update-product.component.html',
})
export class ModalUpdateProductComponent {
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();

  private productService = inject(ProductsService);

  onSave() {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        alertSuccess('Produto atualizado com sucesso!');
        this.closeModal.emit();
      },
      error: (e) => {
        alertError(`Erro ao atualizar o produto: ${e.error.message}`);
      }
    });
  }

  onCancel() {
    this.closeModal.emit();
  }
}
