import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpensesService } from '../../services/expenses.service';
import Expense from '../../interfaces/Expense';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-create-expenses',
  imports: [ReactiveFormsModule],
  templateUrl: './create-expenses.component.html',
})
export class CreateExpensesComponent {
  formCreateExpense = new FormGroup({
    supplier: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    value: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    status: new FormControl('Pendente', [Validators.required]),
    datePayment: new FormControl('', [Validators.required]),
  });
  private expenseService = inject(ExpensesService);

  onSubmit() {
    const { supplier, description, status, value, datePayment } = this.formCreateExpense.value;
    const newExpense: Expense = {
      supplier: supplier || '',
      description: description || '',
      value: value ? parseFloat(value.toString()) : 0,
      status: 'Pendente',
      datePayment: datePayment || new Date().toISOString(),
    };

    if (this.formCreateExpense.valid) {
      this.expenseService.createExpense(newExpense).subscribe({
        next: (_response) => {
          alertSuccess(`Despesa registrada com sucesso!`);
          this.formCreateExpense.reset();
        },
        error: (e) => {
          alertError(`Error ao registrar Produto: ${e.error.message}`);
          this.formCreateExpense.markAllAsTouched();
        },
      });
    } else {
      this.formCreateExpense.markAllAsTouched();
    }
  }
}
