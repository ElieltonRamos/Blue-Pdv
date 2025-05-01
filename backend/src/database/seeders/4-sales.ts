import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'sales',
      [
        {
          id: 1,
          clientId: 2,
          clientName: 'Joao',
          userOperator: 1,
          paymentMethod: 'Cartão',
          date: new Date('2025-05-01T10:30:00Z'),
          totalProducts: 3,
          total: 60,
        },
        {
          id: 2,
          clientId: 1,
          clientName: 'Avista',
          userOperator: 2,
          paymentMethod: 'Dinheiro',
          date: new Date('2025-05-01T11:00:00Z'),
          totalProducts: 2,
          total: 40,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('sales', {});
  },
};
