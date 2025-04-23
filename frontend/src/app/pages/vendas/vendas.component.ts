import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Client from '../../interfaces/client';
import Product from '../../interfaces/product';

@Component({
  selector: 'app-vendas',
  imports: [FormsModule],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {
  client: Client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
  token = JSON.parse(localStorage.getItem('token') || '');
  vendedorLogado = this.token.token.username;
  codigoBarras: string = '';
  searchClients: Client[] = [];
  products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10, code: '1', quantity: 1 },
    { id: 2, name: 'Produto 2', price: 20, code: '2', quantity: 2 },
  ];

  constructor(private clientService: ClientService) {}

  buscarProdutoPorCodigo() {
    console.log('Produto escaneado:', this.codigoBarras);
    // aqui você pode buscar o produto no banco ou array local
    this.codigoBarras = ''; // limpa o campo após leitura
  }

  removeItem(item: Product) {
    // lógica pra remover
  }

  editItem(item: Product) {
    // lógica pra editar
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
