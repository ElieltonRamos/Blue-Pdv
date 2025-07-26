import { Component, inject } from '@angular/core';
import Product from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { alertConfirm, alertError, alertSuccess } from '../alerts/custom-alerts';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ModalUpdateProductComponent } from '../modal-update-product/modal-update-product.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  imports: [FormsModule, PaginatorComponent, ModalUpdateProductComponent],
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent {
  listProducts: Product[] = [];
  page: number = 1;
  limit: number = 20;
  totalPages: number = 0;
  totalItems: number = 0;
  showModalEdit: boolean = false;
  editProduct: Product = { name: '', price: 0, quantity: 0, code: 0, costPrice: 0, isMeatBovine: true };
  searchTerm: string = '';
  private productService = inject(ProductsService);

  ngOnInit() {
    this.getAllProducts(this.page, this.limit);
  }

  getProductByName() {
    if (this.searchTerm !== '') {
      this.productService.getProductByName(this.searchTerm).subscribe({
      next: (response) => {
        this.listProducts = response;
        this.totalItems = response.length;
        this.page = 1; // Reset to first page
        this.limit = response.length; // Show all results
        this.totalPages = 1; // Only one page for search results
      },
      error: (e) => {
        alertError(`Error ao buscar Produto: ${e.error.message}`);
      }
    });
    } else {
      this.getAllProducts(1, 20);
    }
  }

  getAllProducts(page: number, limit: number) {
    this.productService.getAllProducts(page, limit).subscribe({
      next: (response) => {
        console.log('Products fetched:', response);
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
