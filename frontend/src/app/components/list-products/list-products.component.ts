import { Component, inject } from '@angular/core';
import Product from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { alertConfirm, alertError, alertSuccess } from '../alerts/custom-alerts';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';

@Component({
  selector: 'app-list-products',
  imports: [PaginatorComponent, ModalEditProductComponent],
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent {
  listProducts: Product[] = [];
  page: number = 1;
  limit: number = 20;
  totalPages: number = 0;
  totalItems: number = 0;
  showModalEdit: boolean = false;
  editProduct: Product = { name: '', price: 0, quantity: 0, code: 0 };
  private productService = inject(ProductsService);

  ngOnInit() {
    this.getAllProducts(this.page, this.limit);
  }

  getAllProducts(page: number, limit: number) {
    this.productService.getAllProducts(page, limit).subscribe({
      next: (response) => {
        this.listProducts = response.data;
        this.totalItems = response.total;
        this.page = response.page;
        this.limit = response.limit;
        this.totalPages = response.totalPages;
      },
      error: (e) => {
        alertError(`Error ao listar Produtos: ${e.error.message}`);
      },
    });
  }

  deleteProduct(product: Product) {
    alertConfirm('Excluir Produto?').then((result) => {
      if (result) {
        this.productService.deleteProduct(product.id!).subscribe({
          next: () => {
            alertSuccess('Produto excluido com sucesso');
            this.getAllProducts(this.page, this.limit);
          },
          error: (e) => {
            alertError(`Error ao excluir Produto: ${e.error.message}`);
          },
        });
      }
    }
    );
  }

  closeModalEdit() {
    this.showModalEdit = false;
    this.getAllProducts(this.page, this.limit);
  }

  openModalEdit(product: Product) {
    this.editProduct = product;
    this.showModalEdit = true;
  }

}
