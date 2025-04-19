import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private service: LoginService, private route: Router) {}

  onSubmit() {
    const { username, password } = this.form.value;

    if (typeof username !== 'string' || typeof password !== 'string' || this.form.invalid) return;

    this.service.login(username, password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.route.navigate(['/menu']);
      },
      error: (err) => {
        alert('Não foi possivel fazer o login'),
        console.log(err);
      },
    });

    this.form.reset();
  }
}
