import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateExpensesComponent } from '../../components/create-expenses/create-expenses.component';
import { ListExpensesComponent } from '../../components/list-expenses/list-expenses.component';
import { ReportsExpensesComponent } from '../../components/reports-expenses/reports-expenses.component';

@Component({
  selector: 'app-financial',
  imports: [CreateExpensesComponent, ListExpensesComponent, ReportsExpensesComponent],
  templateUrl: './financial.component.html',
})
export class FinancialComponent {
  private router = inject(Router)
  menuContext = 'listExpenses';
  classBtnSelected = 'bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';
  classBtnUnselected = 'text-white hover:underline px-4 py-2 rounded-lg flex items-center gap-2 font-semibold';

  changeMenuContext(context: string): void {
    this.menuContext = context;
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }
}
