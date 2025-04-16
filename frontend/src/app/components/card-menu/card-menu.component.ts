import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-menu',
  imports: [],
  templateUrl: './card-menu.component.html',
})
export class CardMenuComponent {
@Input () title: string = '';
@Input () icon: string = '';
@Input () path: string = '';

constructor(private router: Router) {}

navigateTo(path: string) {
  return this.router.navigate([path]);
}
}
