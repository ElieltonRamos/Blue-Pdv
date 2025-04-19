import { Request, Response } from 'express';
import mapHttpStatus from '../utils/mapStatusHttp';
import clientService from '../services/clientService';

async function register(req: Request, res: Response) {
  try {
    const { name, phone, adress } = req.body;
    const { status, data } = await clientService.register({ name, phone, adress });
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error registering client:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: 'Internal server error' });
  }
}

export default {
  register,
};
