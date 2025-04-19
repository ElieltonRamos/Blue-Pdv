import { Op } from 'sequelize';
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

async function getAllClients(): Promise<ServiceResponse<Client[]>> {
  const clients = await ClientModel.findAll();
  if (!clients) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao buscar clientes' }};
  }
  const allClients = clients.map((client) => client.dataValues);
  return { status: 'OK', data: allClients };
}

async function searchClients(searchName: string): Promise<ServiceResponse<Client[]>> {
  const clients = await ClientModel.findAll({
    where: {
      name: {
        [Op.like]: `%${searchName}%`,
      },
    },
  });
  if (!clients) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao buscar clientes' }};
  }
  const foundClients = clients.map((client) => client.dataValues);
  return { status: 'OK', data: foundClients };
};

async function getClientById(id: string): Promise<ServiceResponse<Client>> {
  const client = await ClientModel.findByPk(id);
  if (!client) return { status: 'NOT_FOUND', data: { message: 'Cliente não encontrado' }};
  return { status: 'OK', data: client.dataValues };
}

export default {
  register,
  getAllClients,
  getClientById,
  searchClients,
};
