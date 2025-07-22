import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('expenses', [
      {
        description: 'Compra de materiais de escritório',
        supplier: 'Kalunga',
        status: 'Pago',
        value: 350.75,
        date_payment: new Date('2025-07-01'),
      },
      {
        description: 'Reembolso de transporte',
        supplier: 'Uber',
        status: 'Pendente',
        value: 78.4,
        date_payment: new Date('2025-07-03'),
      },
      {
        description: 'Assinatura mensal do Adobe',
        supplier: 'Adobe',
        status: 'Pago',
        value: 59.99,
        date_payment: new Date('2025-07-05'),
      },
      {
        description: 'Compra de lanches para reunião',
        supplier: 'Padaria Central',
        status: 'Atrasado',
        value: 42.5,
        date_payment: new Date('2025-07-06'),
      },
      {
        description: 'Campanha de marketing online',
        supplier: 'Google Ads',
        status: 'Pago',
        value: 1200.0,
        date_payment: new Date('2025-07-10'),
      },
      {
        description: 'Serviço de consultoria',
        supplier: 'Tech Solutions',
        status: 'Pendente',
        value: 850.0,
        date_payment: new Date('2025-07-12'),
      },
      {
        description: 'Pagamento de domínio e hospedagem',
        supplier: 'HostGator',
        status: 'Pago',
        value: 199.99,
        date_payment: new Date('2025-07-14'),
      },
      {
        description: 'Compra de papel e toner',
        supplier: 'Staples',
        status: 'Pendente',
        value: 130.25,
        date_payment: new Date('2025-07-16'),
      },
      {
        description: 'Reembolso de viagem',
        supplier: 'LATAM Airlines',
        status: 'Atrasado',
        value: 980.0,
        date_payment: new Date('2025-07-18'),
      },
      {
        description: 'Software de gestão de projetos',
        supplier: 'Trello',
        status: 'Pago',
        value: 49.9,
        date_payment: new Date('2025-07-20'),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('expenses', {});
  },
};
