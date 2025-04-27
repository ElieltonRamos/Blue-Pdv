import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Client from '../../interfaces/client';
import Product from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ModalEditProductComponent } from '../../components/modal-edit-product/modal-edit-product.component';

@Component({
  selector: 'app-vendas',
  imports: [FormsModule, ModalEditProductComponent],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {
  client: Client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
  token = JSON.parse(localStorage.getItem('token') || '');
  vendedorLogado = this.token.token.username;
  product = { code: '', quantity: 1, price: 0 };
  searchClients: Client[] = [];
  products: Product[] = [];
  subtotalValue: number = 0;
  showEditModal = false;
  selectedItem!: Product;

  constructor(
    private clientService: ClientService,
    private productService: ProductsService
  ) {}

  updateSubtotalValue() {
    this.subtotalValue = this.products.reduce(
      (acc, product) => acc + product.price * (product.quantity ?? 1),
      0
    );
  }

  searchProductByCode() {
    if (!this.product.code || this.product.quantity <= 0) {
      return alert('Informe o código e quantidade válidos!');
    }

    this.productService.getProductByCode(this.product.code).subscribe({
      next: (product) => {
        const existingProduct = this.products.find(
          (p) => p.code === product.code
        );
        if (existingProduct) {
          existingProduct.quantity! += this.product.quantity;
        } else {
          const newProduct = {
            ...product,
            quantity: this.product.quantity,
            price: product.price,
          };
          this.products.push(newProduct);
        }
        this.updateSubtotalValue();
        this.product = { code: '', quantity: 1, price: 0 };
      },
      error: (error) => alert(error),
    });
  }

  removeItem(item: Product) {
    this.products = this.products.filter((product) => product.id !== item.id);
    this.updateSubtotalValue();
  }

  editItem(item: Product) {
    this.selectedItem = { ...item };
    this.showEditModal = true;
  }

  openEditModal(item: Product) {
    this.selectedItem = item;
    this.showEditModal = true;
  }

  onSaveItem(updatedItem: Product) {
    const index = this.products.findIndex((p) => p.id === updatedItem.id);

    if (index !== -1) {
      this.products[index] = updatedItem;
      this.updateSubtotalValue();
    }

    this.showEditModal = false;
  }

  onCancelEdit() {
    this.showEditModal = false;
  }

  formatNumber(n: number): number {
    return parseFloat(n.toFixed(2));
  }

  findClientById(id: string) {
    return this.clientService.findClientById(Number(id)).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        alert('Cliente não encontrado');
        console.log('Erro ao buscar cliente:', error);
      },
    });
  }

  findClientByName(name: string) {
    return this.clientService.findClientByName(name).subscribe({
      next: (data) => {
        this.searchClients = data;
      },
      error: (error) => {
        alert('Cliente não encontrado');
        console.log('Erro ao buscar cliente:', error);
      },
    });
  }
}
