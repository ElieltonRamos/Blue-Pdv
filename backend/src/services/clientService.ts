import { Op } from 'sequelize';
import ClientModel from '../database/models/client.model';
import Client from '../interfaces/client';
import { PaginatedResponse, ServiceResponse } from '../interfaces/services';

async function register(clientData: Client): Promise<ServiceResponse<Client>> {
  const { name, phone, address, cpf } = clientData;
  if (!name || !phone || !address || !cpf) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'E necessario informar nome, telefone, endereço e cpf' },
    };
  }
  const newClient = await ClientModel.create(clientData);
  if (!newClient) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao registrar cliente' } };
  }
  return { status: 'CREATED', data: newClient.dataValues };
}

async function getAllClients(page: number, pageLimit: number)
  : Promise<ServiceResponse<PaginatedResponse<Client>>> {
  if (page < 1 || pageLimit < 1 || isNaN(page) || isNaN(pageLimit)) {
    const message = 'A pagina ou a quantidade de itens por pagina esta incorreto';
    return { status: 'BAD_REQUEST', data: { message } };
  }
  const offset = (page - 1) * pageLimit;

  const { count, rows } = await ClientModel.findAndCountAll({
    limit: pageLimit,
    offset,
  });

  const allClients = rows.map((client) => client.dataValues);
  const totalPages = Math.ceil(count / pageLimit);

  return {
    status: 'OK',
    data: {
      data: allClients,
      total: count,
      page,
      limit: pageLimit,
      totalPages,
    },
  };
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
    return { status: 'SERVER_ERROR', data: { message: 'Erro ao buscar clientes' } };
  }
  const foundClients = clients.map((client) => client.dataValues);
  return { status: 'OK', data: foundClients };
}

async function getClientById(id: string): Promise<ServiceResponse<Client>> {
  const client = await ClientModel.findByPk(id);
  if (!client) return { status: 'NOT_FOUND', data: { message: 'Cliente não encontrado' } };
  return { status: 'OK', data: client.dataValues };
}

async function deleteClient(id: string): Promise<ServiceResponse<{ message: string }>> {
  const client = await ClientModel.findByPk(id);
  if (!client) return { status: 'NOT_FOUND', data: { message: 'Cliente não encontrado' } };

  await ClientModel.destroy({ where: { id } });
  return { status: 'OK', data: { message: 'Cliente deletado com sucesso' } };
}

export default {
  register,
  getAllClients,
  getClientById,
  deleteClient,
  searchClients,
};
