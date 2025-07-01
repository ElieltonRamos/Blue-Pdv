import { Component, EventEmitter, Input, Output } from '@angular/core';
import Client from '../../interfaces/client';

@Component({
  selector: 'app-modal-edit-client',
  imports: [],
  templateUrl: './modal-edit-client.component.html',
})
export class ModalEditClientComponent {
  @Input() client!: Client;
  @Output() closeModal = new EventEmitter<void>();

}
