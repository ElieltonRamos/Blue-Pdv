import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import User from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-modal-edit-user',
  imports: [FormsModule],
  templateUrl: './modal-edit-user.component.html',
})
export class ModalEditUserComponent {
  @Input() user!: User;
  @Output() closeModal = new EventEmitter<void>();
  private userService = inject(LoginService);

  close() {
    this.closeModal.emit();
  }

  save() {
    if (this.user.username === '' || this.user.password === '') {
      alertError('Preencha todos os campos!');
      return;
    }
    this.userService.editUser(this.user.id!, this.user).subscribe({
      next: (_res) => {
        alertSuccess('Usuario Atualizado com sucesso')
        this.close()
      },
      error: (e) => {
        alertError(`Erro ao atualizar o usuario: ${e.error.message}`)
      }
    });
  }
}
