import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Client from '../../interfaces/client';

@Component({
  selector: 'app-vendas',
  imports: [FormsModule],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {

  client: Client = { id:1, name: 'Avista', phone: '0', adress: 'rua 0' }
  token = JSON.parse(localStorage.getItem('token') || '');
  vendedorLogado = this.token.token.username;
  codigoBarras: string = '';
  searchClients: Client[] = []

  constructor(private clientService: ClientService) {};

  buscarProdutoPorCodigo() {
    console.log('Produto escaneado:', this.codigoBarras);
    // aqui você pode buscar o produto no banco ou array local
    this.codigoBarras = ''; // limpa o campo após leitura
  }

  findClientById(id: string) {
    return this.clientService.findClientById(Number(id)).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        alert('Cliente não encontrado');
        console.log('Erro ao buscar cliente:', error);
      }
    });
  };

  findClientByName(name: string) {
    return this.clientService.findClientByName(name).subscribe({
      next: (data) => {
        this.searchClients = data;
      },
      error: (error) => {
        alert('Cliente não encontrado');
        console.log('Erro ao buscar cliente:', error);
      }
    });
  };

}
