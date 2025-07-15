import { Component, inject } from '@angular/core';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';
import { Router } from '@angular/router';
import { alertError } from '../../components/alerts/custom-alerts';

@Component({
  selector: 'app-menu',
  imports: [CardMenuComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private router = inject(Router);
  userType: string = '';

  ngOnInit() {
    const rawToken = localStorage.getItem('token');
    if (rawToken) {
      try {
        const parsed = JSON.parse(rawToken);
        this.userType = parsed?.token?.userType || '';
      } catch (e) {
        alertError(`Erro ao fazer parse do token: ${e}`);
        this.userType = '';
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isActive(): boolean {
    return this.userType === 'Administrador';
  }
}
