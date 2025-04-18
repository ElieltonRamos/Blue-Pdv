import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  imports: [FormsModule],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {

  client = { id:1, name: 'Elielton' }
  vendedorLogado = 'Elielton'
  codigoBarras: string = '';

buscarProdutoPorCodigo() {
  console.log('Produto escaneado:', this.codigoBarras);
  // aqui você pode buscar o produto no banco ou array local
  this.codigoBarras = ''; // limpa o campo após leitura
}


}
