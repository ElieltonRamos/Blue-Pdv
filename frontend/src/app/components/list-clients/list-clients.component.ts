import { Component, inject } from '@angular/core';
import Client from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { alertConfirm, alertError, alertSuccess } from '../alerts/custom-alerts';
import { ModalEditClientComponent } from '../modal-edit-client/modal-edit-client.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-list-clients',
  imports: [ModalEditClientComponent, PaginatorComponent],
  templateUrl: './list-clients.component.html',
})
export class ListClientsComponent {
  listClients: Client[] = [];
  page: number = 1;
  limit: number = 20;
  totalPages: number = 0;
  totalItems: number = 0;
  showModalEdit: boolean = false;
  editClient: Client = { name: '', phone: '', address: '', cpf: '' };
  private clientService = inject(ClientService);

  ngOnInit() {
    this.getClients(this.page, this.limit);
  }

  getClients(page: number, limit: number) {
    console.log('Listando Clientes', page, limit);
    this.clientService.getClients(page, limit).subscribe({
      next: (response) => {
        this.listClients = response.data;
        this.totalItems = response.total;
        this.page = response.page;
        this.limit = response.limit;
        this.totalPages = response.totalPages;
      },
      error: (e) => {
        alertError(`Error ao listar Clientes: ${e.error.message}`);
      },
    });
  }

  deleteClient(client: Client) {
    alertConfirm('Excluir Cliente?').then((result) => {
      if (result) {
        this.clientService.deleteClient(client.id!).subscribe({
          next: () => {
            alertSuccess('Cliente excluido com sucesso');
            this.getClients(this.page, this.limit);
          },
          error: (e) => {
            alertError(`Error ao excluir Cliente: ${e.error.message}`);
          },
        });
      }
    }
    );
  }

  closeModalEdit() {
    this.showModalEdit = false;
    this.getClients(this.page, this.limit);
  }

  openModalEdit(client: Client) {
    this.editClient = client;
    this.showModalEdit = true;
  }

}

