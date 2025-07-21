import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { alertError, alertLoading, closeLoading } from '../../components/alerts/custom-alerts';

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

    alertLoading()
    this.service.login(username, password).subscribe({
      next: (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        this.route.navigate(['/menu']);
        closeLoading();
      },
      error: (err) => {
        closeLoading();
        alertError(`Não foi possivel fazer login! ${err.error.message}`);
      },
    });

    this.form.reset();
  }
}
