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
          price: 10,
        },
        {
          id: 2,
          name: 'Carne Patinho',
          code: '1020',
          price: 20,
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('products', {});
  },
};
