import Client from '../interfaces/client';

async function register(clientData: Client) {
  const { name, phone, adress } = clientData;
  if (!name || !phone || !adress) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'E necessario informar nome, telefone e endereço' },
    };
  }
  const newClient = await clientModel.create(clientData);
  if (!newClient) {
    return {
      status: 'SERVER_ERROR',
      data: { message: 'Erro ao registrar cliente' },
    };
  }
  return { status: 'CREATED', data: newClient };
}

export default {
  register,
};
