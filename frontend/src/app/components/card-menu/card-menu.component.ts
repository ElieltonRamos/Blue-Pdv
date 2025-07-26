import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-menu',
  imports: [CommonModule],
  templateUrl: './card-menu.component.html',
})
export class CardMenuComponent {
@Input () title: string = '';
@Input () icon: string = '';
@Input () path: string = '';
@Input () isActive: boolean = true; // New input to control active state

constructor(private router: Router) {}

navigateTo(path: string) {
  return this.router.navigate([path]);
}

}
