import { Component, Input } from '@angular/core';
import User from '../../interfaces/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-user',
  imports: [FormsModule],
  templateUrl: './modal-edit-user.component.html',
})
export class ModalEditUserComponent {
  @Input() user!: User;
}
