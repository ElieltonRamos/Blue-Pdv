import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateClientComponent } from '../../components/create-client/create-client.component';
import { ListUsersComponent } from '../../components/list-users/list-users.component';

@Component({
  selector: 'app-register-client',
  imports: [CreateClientComponent, ListUsersComponent],
  templateUrl: './register-client.component.html',
})
export class RegisterClientComponent {
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
