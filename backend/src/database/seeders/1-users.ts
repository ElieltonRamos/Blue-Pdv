import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'Elielton',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          user_type: 'Administrador',
        },
        {
          id: 2,
          username: 'Lucas',
          password:bcrypt.hashSync('123456', SALT_ROUNDS),
          user_type: 'Operador',
        }
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('users', {});
  },
};
