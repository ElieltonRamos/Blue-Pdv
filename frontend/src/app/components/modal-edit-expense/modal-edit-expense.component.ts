import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { alertError, alertSuccess } from '../alerts/custom-alerts';
import { FormsModule } from '@angular/forms';
import Expense from '../../interfaces/Expense';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-modal-edit-expense',
  imports: [FormsModule],
  templateUrl: './modal-edit-expense.component.html',
})
export class ModalEditExpenseComponent {
  @Input() expense!: Expense;
  @Output() closeModal = new EventEmitter<void>();
  private expenseService = inject(ExpensesService);

  close() {
    this.closeModal.emit();
  }

  save() {
    this.expenseService.updateExpense(this.expense).subscribe({
      next: (_res) => {
        alertSuccess('Despeja Atualizado com sucesso');
        this.close();
      },
      error: (e) => {
        alertError(`Erro ao atualizar o despeja: ${e.error.message}`);
      },
    });
  }

  formatDateToInput(dateString: string): string {
    if (!dateString) return '';

    // Extrai só a parte da data, ignorando o fuso horário (UTC)
    return dateString.split('T')[0];
  }
}
