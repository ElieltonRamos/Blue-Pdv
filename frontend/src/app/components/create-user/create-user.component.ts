import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  formCreateUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required]),
  });
  private loginService = inject(LoginService);

  onSubmit() {
    const { password, userType, username } = this.formCreateUser.value;
    const newUser = {
      username: username || '',
      password: password || '',
      userType: userType || '',
    };
    
    if (this.formCreateUser.valid) {
      this.loginService.createUser(newUser).subscribe({
        next: (response) => {
          alertSuccess(`Usuario ${response.username} registrado com sucesso!`);
          this.formCreateUser.reset();
        },
        error: (e) => {
          alertError(`Error ao registrar usuario: ${e.error.message}`);
          this.formCreateUser.markAllAsTouched();
        },
      });
    } else {
      this.formCreateUser.markAllAsTouched();
    }
  }
}
