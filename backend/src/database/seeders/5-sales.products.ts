import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'sales_products',
      [
        {
          sale_id: 1,
          product_id: 1,
          quantity: 1,
        },
        {
          sale_id: 1,
          product_id: 2,
          quantity: 2,
        },
        {
          sale_id: 2,
          product_id: 2,
          quantity: 2,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('sales_products', {});
  },
};
