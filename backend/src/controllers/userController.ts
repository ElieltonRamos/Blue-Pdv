import { Request, Response } from 'express';
import userService from '../services/userService';
import mapHttpStatus from '../utils/mapStatusHttp';

const internalMsgError = 'Internal server error';

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const { status, data } = await userService.login(username, password);

    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in login controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function create(req: Request, res: Response) {
  try {
    const { username, password, userType } = req.body;
    const { status, data } = await userService.create({ username, password, userType });
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in create controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function getAll(_req: Request, res: Response) {
  try {
    const { status, data } = await userService.getAll();
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in getAll controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { username, password, userType } = req.body;
    const { status, data } = await userService.updateUser(Number(id), { username, password, userType });
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in updateUser controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await userService.deleteUser(Number(id));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in deleteUser controller:', error);
    return res.status(mapHttpStatus('SERVER_ERROR')).json({ message: internalMsgError });
  }
}

export default {
  login,
  create,
  getAll,
  updateUser,
  deleteUser,
};
