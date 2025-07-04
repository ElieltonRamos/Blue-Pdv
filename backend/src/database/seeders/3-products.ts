import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1,
          name: 'Carne Maca do Peito',
          code: '1010',
          price: 31.99,
        },
        {
          id: 2,
          name: 'Carne Patinho',
          code: '1020',
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
