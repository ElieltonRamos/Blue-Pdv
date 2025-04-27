import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { alertError } from '../alerts/custom-alerts';

@Component({
  selector: 'app-finish-sale',
  imports: [FormsModule],
  templateUrl: './finish-sale.component.html',
})
export class FinishSaleComponent {
  @Output() calculateDiscount = new EventEmitter<string>();
  @Input() totalValue: number = 0;
  valuePaid: number = 0;

  calculateChange() {
    const changeReturn = this.valuePaid - this.totalValue;
    return changeReturn.toFixed(2);
  }

  applyDiscount(value: string) {
    this.calculateDiscount.emit(value);
  }

}
