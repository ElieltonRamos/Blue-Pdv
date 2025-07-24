import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1,
          name: 'Carne Maca do Peito',
          code: '1',
          cost_price: 20.99,
          price: 31.99,
        },
        {
          id: 2,
          name: 'Carne Patinho',
          code: '2',
          cost_price: 18.99,
          price: 20.99,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('products', {});
  },
};
