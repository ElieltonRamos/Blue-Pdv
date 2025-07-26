import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';
import Product from '../../interfaces/product';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
formCreateProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    costPrice: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    quantity: new FormControl(0, [Validators.required]),
  });
  private productService = inject(ProductsService);

  ngOnInit() {
    this.getSugestionCode();
  }

  onSubmit() {
    const { name, code, price, quantity } = this.formCreateProduct.value;
    const newProduct: Product = {
      name: name || '',
      code: code || 0,
      price: price ? parseFloat(price.toString()) : 0,
      costPrice: this.formCreateProduct.value.costPrice ? parseFloat(this.formCreateProduct.value.costPrice.toString()) : 0,
      quantity: quantity ? parseInt(quantity.toString(), 10) : 0,
    };

    if (this.formCreateProduct.valid) {
      this.productService.createProduct(newProduct).subscribe({
        next: (response) => {
          alertSuccess(`Produto ${response.name} registrado com sucesso!`);
          this.formCreateProduct.reset();
          this.getSugestionCode();
        },
        error: (e) => {
          alertError(`Error ao registrar Produto: ${e.error.message}`);
          this.formCreateProduct.markAllAsTouched();
        },
      });
    } else {
      this.formCreateProduct.markAllAsTouched();
    }
  }

  getSugestionCode() {
    this.productService.getSugestionCode().subscribe({
      next: (response) => {
        this.formCreateProduct.patchValue({ code: response.code });
      },
      error: (e) => {
        alertError(`Error ao obter código sugerido: ${e.error.message}`);
      },
    });
  }
}
