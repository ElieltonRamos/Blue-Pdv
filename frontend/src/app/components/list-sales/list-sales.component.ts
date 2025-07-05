import { Component, Input } from '@angular/core';
import { Sale } from '../../interfaces/sale';

@Component({
  selector: 'app-list-sales',
  imports: [],
  templateUrl: './list-sales.component.html',
})
export class ListSalesComponent {
  @Input() sale!: Sale
}
