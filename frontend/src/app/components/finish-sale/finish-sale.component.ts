import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finish-sale',
  imports: [FormsModule],
  templateUrl: './finish-sale.component.html',
})
export class FinishSaleComponent {
  @Output() calculateDiscount = new EventEmitter<string>();
  @Input() totalValue: number = 0;
  @Output() paymentMethodChange = new EventEmitter<string>();
  @Input() paymentMethod!: string;
  @Input() valuePaid!: number;
  @Output() valuePaidChange = new EventEmitter<number>();

  calculateChange() {
    const changeReturn = this.valuePaid - this.totalValue;
    return changeReturn.toFixed(2);
  }

  applyDiscount(value: string) {
    this.calculateDiscount.emit(value);
  }

  onPaymentMethodChange(paymentMethod: string): void {
    this.paymentMethod = paymentMethod;
    this.paymentMethodChange.emit(this.paymentMethod);
  }

}
