import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('expenses', [
      {
        description: 'Compra do Sistema PDV',
        supplier: 'BluePDV',
        status: 'Pago',
        value: 100.00,
        date_payment: new Date('2025-07-01'),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('expenses', {});
  },
};
