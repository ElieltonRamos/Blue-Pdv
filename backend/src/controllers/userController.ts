import { Request, Response } from 'express';
import userService from '../services/userService';
import mapHttpStatus from '../utils/mapStatusHttp';

async function login (req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const { status, data } = await userService.login(username, password);

    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in login controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: 'Internal server error' });
  }
};

export default {
  login
};