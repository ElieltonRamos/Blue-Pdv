import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import Client from '../../interfaces/client';
import Product from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ModalEditProductComponent } from '../../components/modal-edit-product/modal-edit-product.component';
import {
  alertConfirm,
  alertError,
} from '../../components/alerts/custom-alerts';
import { FinishSaleComponent } from '../../components/finish-sale/finish-sale.component';
import { ModalSalesNoteComponent } from '../../components/modal-sales-note/modal-sales-note.component';
import { Sale } from '../../interfaces/sale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  imports: [
    FormsModule,
    ModalEditProductComponent,
    FinishSaleComponent,
    ModalSalesNoteComponent,
  ],
  templateUrl: './vendas.component.html',
})
export class VendasComponent {
  client: Client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
  token = JSON.parse(localStorage.getItem('token') || '');
  vendedorLogado = this.token.token.username;
  product = { code: '', quantity: 1, price: 0, name: '' };
  searchClients: Client[] = [];
  searchProducts: Product[] = [];
  products: Product[] = [];
  subtotalValue: number = 0;
  totalValueDiscount: number = 0;
  showEditModal = false;
  selectedItem!: Product;
  valuePaid = 0;
  showSaleModal = false;
  saleData!: Sale;
  paymentMethod = 'Dinheiro';

  constructor(
    private clientService: ClientService,
    private productService: ProductsService,
    private router: Router
  ) {}

  goToMenu() {
    alertConfirm(
      'Voltar para o menu ? A venda sera cancelada!',
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this.products = [];
        this.subtotalValue = 0;
        this.totalValueDiscount = 0;
        this.client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
        this.product = { code: '', quantity: 1, price: 0, name: '' };
        this.router.navigate(['menu']);
      }
    });
  }

  updateSubtotalValue() {
    this.subtotalValue = this.products.reduce(
      (acc, product) => acc + product.price * (product.quantity ?? 1),
      0
    );
    this.totalValueDiscount = this.subtotalValue;
  }

  calculateDiscount(value: string) {
    let discount = Number(value);
    if (isNaN(discount) || discount < 0) discount = 0;

    if (discount === 0) {
      this.totalValueDiscount = this.subtotalValue;
    } else {
      const newSubtotal = this.subtotalValue - discount;
      this.totalValueDiscount = Math.max(newSubtotal, 0);
    }
  }

  searchProductByCode() {
    if (!this.product.code || this.product.quantity <= 0) {
      return alertError('Informe o código e quantidade válidos!');
    }

    const productHeavy = this.extractProductCodeAndWeight(this.product.code);
    if (productHeavy) {
      this.product.code = productHeavy.productCode;
      this.product.quantity = productHeavy.weightInGrams / 1000;
    }

    this.productService.getProductByCode(this.product.code).subscribe({
      next: (product) => {
        const existingProduct = this.products.find(
          (p) => p.code === product.code
        );
        if (existingProduct) {
          existingProduct.quantity! += this.product.quantity;
        } else {
          const newProduct = {
            ...product,
            quantity: this.product.quantity,
            price: product.price,
          };
          this.products.push(newProduct);
        }
        this.updateSubtotalValue();
        this.product = { code: '', quantity: 1, price: 0, name: '' };
      },
      error: (error) => alertError(error.error.message),
    });
  }

  onPaymentMethodChange(newPaymentMethod: string) {
    this.paymentMethod = newPaymentMethod;
  }

  removeItem(item: Product) {
    this.products = this.products.filter((product) => product.id !== item.id);
    this.updateSubtotalValue();
  }

  editItem(item: Product) {
    this.selectedItem = { ...item };
    this.showEditModal = true;
  }

  openEditModal(item: Product) {
    this.selectedItem = item;
    this.showEditModal = true;
  }

  onSaveItem(updatedItem: Product) {
    const index = this.products.findIndex((p) => p.id === updatedItem.id);

    if (index !== -1) {
      this.products[index] = updatedItem;
      this.updateSubtotalValue();
    }

    this.showEditModal = false;
  }

  onCancelEdit() {
    this.showEditModal = false;
  }

  formatNumber(n: number): number {
    return parseFloat(n.toFixed(2));
  }

  cancelSale() {
    alertConfirm('Cancelar Venda').then(
      (isConfirmed) => {
        if (isConfirmed) {
          this.products = [];
          this.subtotalValue = 0;
          this.totalValueDiscount = 0;
          this.client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
          this.product = { code: '', quantity: 1, price: 0, name: '' };
        }
      }
    );
  }

  finishSale() {
    if (this.products.length === 0) {
      return alertError('Adicione produtos à venda!');
    }

    const saleData = {
      date: new Date().toLocaleString(),
      clientId: this.client.id || 1,
      clientName: this.client.name,
      paymentMethod: this.paymentMethod,
      products: this.products,
      totalProduts: this.subtotalValue,
      total: this.totalValueDiscount,
      userOperator: this.vendedorLogado,
    };

    this.saleData = saleData;

    alertConfirm('Finalizar Venda ?').then(
      (isConfirmed) => {
        if (isConfirmed) {
          console.log('Venda finalizada:', saleData);
          // adicionar service para salvar venda
          this.showSaleModal = true;
          this.products = [];
          this.subtotalValue = 0;
          this.totalValueDiscount = 0;
          this.client = { id: 1, name: 'Avista', phone: '0', adress: 'rua 0' };
          this.product = { code: '', quantity: 1, price: 0, name: '' };
          this.paymentMethod = 'Dinheiro';
          this.valuePaid = 0;
        }
      }
    );
  }

  closeSaleModal() {
    this.showSaleModal = false;
  }

  findClientById(id: string) {
    return this.clientService.findClientById(Number(id)).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        alertError(error.error.message);
      },
    });
  }

  findClientByName(name: string) {
    return this.clientService.findClientByName(name).subscribe({
      next: (data) => {
        this.searchClients = data;
      },
      error: (error) => {
        alertError(error.error.message);
      },
    });
  }

  findProductByName(name: string) {
    return this.productService.getProductByName(name).subscribe({
      next: (data) => {
        this.searchProducts = data;
      },
      error: (error) => {
        alertError(error.error.message);
      },
    });
  }

  extractProductCodeAndWeight(
    ean13: string
  ): { productCode: string; weightInGrams: number } | false {
    if (!/^02\d{11}$/.test(ean13)) {
      return false;
    }
    const productCode = ean13.substring(2, 6);
    const weightInGrams = parseInt(ean13.substring(6, 11));
    return {
      productCode,
      weightInGrams,
    };
  }
}
