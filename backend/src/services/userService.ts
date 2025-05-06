import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { LoginResponse, ServiceResponse } from '../interfaces/services';
import User from '../interfaces/user';

async function login(username: string, password: string): Promise<ServiceResponse<LoginResponse>> {
  if (!username || !password) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os campos usuario e senha são necessarios' },
    };
  }
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !user.dataValues.password) {
    return { status: 'UNAUTHORIZED', data: { message: 'Usuario invalido' } };
  }
  if (!bcrypt.compareSync(password, user.dataValues.password))
    return { status: 'UNAUTHORIZED', data: { message: 'Senha invalida' } };

  const token = {
    username: user.dataValues.username,
    userType: user.dataValues.userType,
    id: user.dataValues.id,
  };

  return { status: 'OK', data: { token } };
}

async function create(user: User): Promise<ServiceResponse<User>> {
  const { username, password, userType } = user;

  if (!username || !password || !userType) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Os campos usuario, senha e tipo de usuario são necessarios' },
    };
  }

  const existingUser = await UserModel.findOne({ where: { username } });
  if (existingUser) {
    return {
      status: 'CONFLICT',
      data: { message: 'Usuario ja existe' },
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await UserModel.create({ username, password: hashedPassword, userType });

  return { status: 'CREATED', data: newUser.dataValues };
}

async function getAll(): Promise<ServiceResponse<User[]>> {
  const users = await UserModel.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: 'OK', data: users.map((user) => user.dataValues) };
}

async function updateUser(id: number, data: User): Promise<ServiceResponse<User>> {
  const usernameInvalid = data.username === '' || data.username === undefined || data.username === null;
  const passwordInvalid = data.password === '' || data.password === undefined || data.password === null;
  
  if (isNaN(id)) return { status: 'BAD_REQUEST', data: { message: 'Id Invalido'} };
  
  if (usernameInvalid || passwordInvalid) {
    return { status: 'BAD_REQUEST', data: { message: 'Usuario e senha são necessarios' } };
  }

  const update = await UserModel.update(data, { where: { id } });
  if (update[0] === 0) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Usuario não atualizado, tente novamente!' },
    };
  }
  const updatedUser = { id: data.id, username: data.username, userType: data.userType };
  return { status: 'OK', data: updatedUser };
}

export default {
  login,
  create,
  getAll,
  updateUser,
};
