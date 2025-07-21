import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sale } from '../../interfaces/sale';

@Component({
  selector: 'app-modal-sales-note',
  imports: [],
  templateUrl: './modal-sales-note.component.html',
})
export class ModalSalesNoteComponent {
  @Input() saleData!: Sale;
  @Output() closeModal = new EventEmitter<void>();
  date = new Date().toLocaleString();

  ngOnInit() {
    console.log(this.saleData);
  }

  getQuantity(item: any): number {
    return parseFloat(item.sales_products?.quantity ?? item.quantity ?? 0);
  }

  calculateDiscount(): number {
    const discount = this.saleData.totalProducts - this.saleData.total;
    if (discount > 0) {
      return this.formatNumber(discount);
    }
    return 0;
  }

  formatNumber(n: any): number {
    const num = Number(n);
    return isNaN(num) ? 0 : parseFloat(num.toFixed(2));
  }

  close() {
    this.closeModal.emit();
  }

  print() {
    const content = document.getElementById('invoiceContent')?.innerHTML;
    if (!content) {
      console.error('Conteúdo da nota fiscal não encontrado.');
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      console.error('Não foi possível acessar o iframe.');
      return;
    }

    doc.open();
    doc.write(`
    <html>
      <head>
        <title>Imprimir Nota</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: monospace, sans-serif;
            font-size: 12px;
            width: 58mm;
            padding: 8px 10px;
            color: #000;
            line-height: 1.4;
          }
          h2 {
            text-align: center;
            font-size: 14px;
            margin-bottom: 14px;
          }
          p {
            margin-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 14px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px 8px;
            font-size: 11px;
          }
          th {
            background: #f0f0f0;
          }
          .text-center {
            text-align: center;
          }
          .text-right {
            text-align: right;
          }
          hr {
            border: none;
            border-top: 1px dashed #000;
            margin: 10px 0;
          }
        </style>
      </head>
      <body onload="window.print(); setTimeout(() => window.close(), 100);">
        ${content}
      </body>
    </html>
  `);
    doc.close();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  }
}
