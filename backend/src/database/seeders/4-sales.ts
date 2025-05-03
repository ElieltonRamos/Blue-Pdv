import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'sales',
      [
        {
          id: 1,
          client_id: 2,
          user_operator: 1,
          payment_method: 'Cartão',
          date: new Date('2025-05-01'),
          total_products: 3,
          total: 60,
        },
        {
          id: 2,
          client_id: 1,
          user_operator: 2,
          payment_method: 'Dinheiro',
          date: new Date('2025-05-02'),
          total_products: 2,
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
