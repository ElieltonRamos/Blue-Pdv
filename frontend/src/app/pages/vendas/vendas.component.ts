import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Client from '../../interfaces/client';
import Product from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-vendas',
  imports: [FormsModule],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {
  client: Client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
  token = JSON.parse(localStorage.getItem('token') || '');
  vendedorLogado = this.token.token.username;
  product = { code: '', quantity: 0, price: 0 };
  searchClients: Client[] = [];
  products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, code: '1', quantity: 1 },
    { id: 2, name: 'Produto 2', price: 20, code: '2', quantity: 2 },
  ];

  constructor(private clientService: ClientService, private productService: ProductsService) {}

  buscarProdutoPorCodigo() {
    if (!this.product.code || this.product.quantity <= 0) {
      return alert('Informe o código e quantidade válidos!');
    }
    this.productService.getProductByCode(this.product.code).subscribe({
      next: (product) => this.products.push({...product, quantity: this.product.quantity}),
      error: (error) => alert(error),
    });
    this.product = { code: '', quantity: 0, price: 0 };
  }

  removeItem(item: Product) {
    const filteredProducts = this.products.filter((product) => product.id !== item.id);
    this.products = filteredProducts;
  }

  editItem(item: Product) {
    const quantity = item.quantity ?? 1;
    this.product = {...item, quantity};
    this.removeItem(item);
  }

  subtotal(): number {
    return this.products.reduce((acc, p) => acc + p.price * (p.quantity ?? 1), 0);
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
