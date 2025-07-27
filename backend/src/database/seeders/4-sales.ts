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
          total_products_without_discount: 106.56,
          total: 106.56,
          discount: 0,
          profit_sale: 0.00,
          is_paid: true,
        },
        {
          id: 2,
          client_id: 1,
          user_operator: 2,
          payment_method: 'Dinheiro',
          date: new Date('2025-05-02'),
          total_products_without_discount: 53.50,
          total: 53.50,
          discount: 0,
          profit_sale: 0.00,
          is_paid: true,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('sales', {});
  },
};
