import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { LoginResponse, ServiceResponse } from '../interfaces/services';

async function login( username: string, password: string ): Promise<ServiceResponse<LoginResponse>> {
  if (!username || !password) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os campos usuario e senha são necessarios' },
    };
  }
  const user = await UserModel.findOne({ where: { username } });
  if (!user) {
    return { status: 'UNAUTHORIZED', data: { message: 'Usuario invalido' } };
  }
  if (!bcrypt.compareSync(password, user.dataValues.password))
    return { status: 'UNAUTHORIZED', data: { message: 'Senha invalida' } };

  const token = {
    username: user.dataValues.username,
    function: user.dataValues.function,
    id: user.dataValues.id,
  };

  return { status: 'OK', data: { token } };
}

export default {
  login,
};
