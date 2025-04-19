import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          id: 1,
          name: 'Avista',
          adress: 'Clientes Avista',
          phone: '00000000000',
        },
        {
          id: 2,
          name: 'João',
          adress: 'Rua dos bobos, n=0, centro',
          phone: '38988776655',
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('clients', {});
  },
};
