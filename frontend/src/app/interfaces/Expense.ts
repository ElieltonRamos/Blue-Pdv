export default interface Expense {
  id?: number;
  supplier: string;
  description: string;
  value: number;
  datePay: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
}
