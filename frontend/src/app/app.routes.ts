import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { RegisterProductComponent } from './pages/register-product/register-product.component';
import { SalesHistoryComponent } from './pages/sales-history/sales-history.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vendas',
    component: VendasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-usuario',
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-cliente',
    component: RegisterClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-produto',
    component: RegisterProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historico-vendas',
    component: SalesHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'relatorios',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
