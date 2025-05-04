import { Component, inject } from '@angular/core';
import User from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { alertError } from '../alerts/custom-alerts';

@Component({
  selector: 'app-list-users',
  imports: [],
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent {
  listUsers: User[] = [];
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
}
