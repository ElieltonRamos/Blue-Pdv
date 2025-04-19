import { Request, Response } from 'express';
import mapHttpStatus from '../utils/mapStatusHttp';
import clientService from '../services/clientService';

const internalMsgError = 'Internal server error';

async function register(req: Request, res: Response) {
  try {
    const { name, phone, adress } = req.body;
    const { status, data } = await clientService.register({ name, phone, adress });
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error registering client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getAllClients(req: Request, res: Response) {
  try {
    const { status, data } = await clientService.getAllClients();
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching clients:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getClientById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await clientService.getClientById(id);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error fetching client by ID:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function searchClients(req: Request, res: Response) {
  try {
    const { name } = req.params;
    const { status, data } = await clientService.searchClients(name);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error searching clients:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
};

export default {
  register,
  getAllClients,
  getClientById,
  searchClients,
};
