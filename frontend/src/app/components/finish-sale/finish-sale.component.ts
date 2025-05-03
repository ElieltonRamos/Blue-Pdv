import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  calculateChange() {
    const changeReturn = this.valuePaid - this.totalValue;
    return changeReturn.toFixed(2);
  }

  applyDiscount(value: number) {
    this.calculateDiscount.emit(value);
  }

  onPaymentMethodChange(paymentMethod: string): void {
    this.paymentMethod = paymentMethod;
    this.paymentMethodChange.emit(this.paymentMethod);
  }

}
