import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'vendas',
    component: VendasComponent
  },
  {
    path: 'cadastro-usuario',
    component: RegisterUserComponent
  }
];
