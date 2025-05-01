import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'sales_products',
      [
        {
          saleId: 1,
          productId: 1,
          quantity: 1,
        },
        {
          saleId: 1,
          productId: 2,
          quantity: 2,
        },
        {
          saleId: 2,
          productId: 2,
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
