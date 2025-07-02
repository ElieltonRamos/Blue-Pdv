import { QueryInterface } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          id: 1,
          name: 'Avista',
          address: 'Clientes Avista',
          phone: '00000000000',
          cpf: '00000000000',
        },
        {
          id: 2,
          name: 'João',
          address: 'Rua dos bobos, n=0, centro',
          phone: '38988776655',
          cpf: '12345678901',
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('clients', {});
  },
};
