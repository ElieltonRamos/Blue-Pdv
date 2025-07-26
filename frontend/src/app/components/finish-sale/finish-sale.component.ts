import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finish-sale',
  imports: [FormsModule],
  templateUrl: './finish-sale.component.html',
})
export class FinishSaleComponent {
  @Output() calculateDiscount = new EventEmitter<number>();
  @Input() totalValue: number = 0;
  @Output() paymentMethodChange = new EventEmitter<string>();
  @Input() paymentMethod!: string;
  @Input() valuePaid!: number;
  @Output() valuePaidChange = new EventEmitter<number>();
  @Input() discountValue: number = 0;
  @Output() discountValueChange = new EventEmitter<number>();
  @Input() clientId: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      const newId = changes['clientId'].currentValue;

      if (newId === 1) {
        this.paymentMethod = 'Dinheiro';
        this.paymentMethodChange.emit('Dinheiro');
      } else {
        this.paymentMethod = 'Notinha';
        this.paymentMethodChange.emit('Notinha');
      }
    }
  }

  calculateChange() {
    const changeReturn = this.valuePaid - this.totalValue;
    return changeReturn.toFixed(2);
  }

  applyDiscount(value: number) {
    this.calculateDiscount.emit(value);
  }

  onPaymentMethodChange(paymentMethod: string): void {
    if (this.clientId === 1 && paymentMethod === 'Notinha') {
      // Bloqueia a seleção e limpa a escolha
      this.paymentMethod = 'Dinheiro';
      this.paymentMethodChange.emit('');
      return;
    }

    this.paymentMethod = paymentMethod;
    this.paymentMethodChange.emit(this.paymentMethod);
  }
}
