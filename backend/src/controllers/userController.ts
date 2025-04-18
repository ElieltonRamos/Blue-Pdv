import { Request, Response } from 'express';

function login (req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    return res.status(200).json({ message: 'ok', username, password });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export default {
  login
};