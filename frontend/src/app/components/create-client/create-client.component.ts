import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './create-client.component.html',
  providers: [provideNgxMask()],
})
export class CreateClientComponent {

  formCreateClient = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/) // apenas 11 dígitos
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/) // 10 ou 11 dígitos (com DDD)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

   onSubmit() {
    if (this.formCreateClient.valid) {
      console.log('Cliente cadastrado:', this.formCreateClient.value);
    } else {
      this.formCreateClient.markAllAsTouched(); // ativa os erros visuais
    }
  }

}
