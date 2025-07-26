import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-update-cost-price-meats',
  imports: [ReactiveFormsModule],
  templateUrl: './update-cost-price-meats.component.html',
})
export class UpdateCostPriceMeatsComponent {
  formUpdateCostPrice = new FormGroup({
    costPrice: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });
  private productService = inject(ProductsService);

  ngOnInit() {
    this.getCostPriceMeat();
  }

  onSubmit() {
    const { costPrice } = this.formUpdateCostPrice.value;
    if (this.formUpdateCostPrice.valid) {
      this.productService.updateCostPriceMeats(costPrice as number).subscribe({
        next: () => {
          alertSuccess('Preço de Custo das carnes atualizado com sucesso!');
          this.formUpdateCostPrice.reset();
        },
        error: (error) => {
          alertError(
            `Erro ao atualizar o preço de custo das carnes: ${
              error.error.message || 'Erro no servidor'
            }`
          );
        },
      });
    } else {
      this.formUpdateCostPrice.markAllAsTouched();
    }
  }

  getCostPriceMeat() {
    this.productService.getProductByCode('1').subscribe({
      next: (product) => {
        this.formUpdateCostPrice.patchValue({
          costPrice: product.costPrice,
        });
      },
      error: (error) => {
        alertError(
          `Erro ao buscar o preço de custo das carnes: ${
            error.error.message || 'Erro no servidor'
          }`
        );
      },
    })
  }
}
