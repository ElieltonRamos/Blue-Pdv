import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Client from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-client',
  imports: [FormsModule],
  templateUrl: './modal-edit-client.component.html',
})
export class ModalEditClientComponent {
  @Input() client!: Client;
  @Output() closeModal = new EventEmitter<void>();
  private userService = inject(ClientService);

  close() {
    this.closeModal.emit();
  }

  save() {
    this.userService.updateClient(this.client.id!!, this.client).subscribe({
      next: (_res) => {
        alertSuccess('Cliente Atualizado com sucesso')
        this.close()
      },
      error: (e) => {
        alertError(`Erro ao atualizar o Cliente: ${e.error.message}`)
      }
    });
  }
}
