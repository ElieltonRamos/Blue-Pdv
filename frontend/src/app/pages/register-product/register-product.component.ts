import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { CreateProductComponent } from '../../components/create-product/create-product.component';

@Component({
  selector: 'app-register-product',
  imports: [ListProductsComponent, CreateProductComponent],
  templateUrl: './register-product.component.html',
})
export class RegisterProductComponent {
  private router = inject(Router)
  menuContext = 'create';
  classBtnSelected = 'bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';
  classBtnUnselected = 'text-white hover:underline px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';

  changeMenuContext(context: string): void {
    this.menuContext = context;
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }
}
