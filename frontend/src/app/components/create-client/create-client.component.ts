import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClientService } from '../../services/client.service';
import { alertError, alertSuccess } from '../alerts/custom-alerts';

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './create-client.component.html',
  providers: [provideNgxMask()],
})
export class CreateClientComponent {

  private clientService = inject(ClientService);

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
      Validators.pattern(/^\d{11}$/) // 11 dígitos (com DDD)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

   onSubmit() {
    if (this.formCreateClient.valid) {
      const newClient = {
        name: this.formCreateClient.value.name || '',
        phone: this.formCreateClient.value.phone || '',
        address: this.formCreateClient.value.address || '',
        cpf: this.formCreateClient.value.cpf || ''
      }
      this.clientService.createClient(newClient).subscribe({
        next: (response) => {
          alertSuccess(`Cliente ${response.name} registrado com sucesso!`);
          this.formCreateClient.reset(); // limpa o formulário após o envio
        },
        error: (error) => {
          alertError(`Erro ao registrar cliente: ${error.error.message}`);
        }
      });
    } else {
      this.formCreateClient.markAllAsTouched(); // ativa os erros visuais
    }
  }

}
