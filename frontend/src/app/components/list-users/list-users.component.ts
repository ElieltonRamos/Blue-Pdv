import { Component, inject } from '@angular/core';
import User from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { alertError } from '../alerts/custom-alerts';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';

@Component({
  selector: 'app-list-users',
  imports: [ModalEditUserComponent],
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent {
  listUsers: User[] = [];
  showModalEdit: boolean = false;
  editUser: User = {id: 1, password: '', username: '', userType: '' }
  private loginService = inject(LoginService);

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loginService.getUsers().subscribe({
      next: (response) => {
        this.listUsers = response;
      },
      error: (e) => {
        alertError(`Error ao listar usuarios: ${e.error.message}`);
      },
    });
  }

  closeModalEdit() {
    this.showModalEdit = false;
    this.getUsers();
  }

  openModalEdit(user: User) {
    this.editUser = user;
    this.showModalEdit = true;
  }
}
