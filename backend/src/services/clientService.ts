import ClientModel from '../database/models/client.model';
import Client from '../interfaces/client';
import { ServiceResponse } from '../interfaces/services';

async function register(clientData: Client): Promise<ServiceResponse<Client>> {
  const { name, phone, adress } = clientData;
  if (!name || !phone || !adress) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'E necessario informar nome, telefone e endereço' },
    };
  }
  const newClient = await ClientModel.create(clientData);
  if (!newClient) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao registrar cliente' }};
  }
  return { status: 'CREATED', data: newClient.dataValues };
}

export default {
  register,
};
