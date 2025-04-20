import { Request, Response } from 'express';
import mapHttpStatus from '../utils/mapStatusHttp';
import productService from '../services/productService';

const msgInternalError = 'Internal server error';

async function register(req: Request, res: Response) {
  try {
    const { name, code, price } = req.body;
    const { status, data } = await productService.register({name, code, price});
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in register controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
}

export default {
  register,
};
