import { Component, inject } from '@angular/core';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { ListUsersComponent } from '../../components/list-users/list-users.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  imports: [CreateUserComponent, ListUsersComponent],
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  private router = inject(Router)
  menuContext = 'create';
  classBtnSelected = 'bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';
  classBtnUnselected = 'text-white hover:underline px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';

  changeMenuContext(context: string): void {
    this.menuContext = context;
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }
}
