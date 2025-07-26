import { Request, Response } from 'express';
import mapHttpStatus from '../utils/mapStatusHttp';
import productService from '../services/productService';

const msgInternalError = 'Internal server error';

async function register(req: Request, res: Response) {
  try {
    const { name, code, price, costPrice, isMeatBovine } = req.body;
    const { status, data } = await productService
      .register({name, code, price, costPrice, isMeatBovine});
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in register controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
}

async function getAllProducts(req: Request, res: Response) {
  try {
    const { page = 1, pageLimit = 10 } = req.query;
    const { status, data } = await productService.getAllProducts(Number(page), Number(pageLimit));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in getAllProducts controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await productService.getProductById(Number(id));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in getProductById controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

async function getProductByCode(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const { status, data } = await productService.getProductByCode(code);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in getProductByCode controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

async function getProductByName(req: Request, res: Response) {
  try {
    const { name } = req.params;
    const { status, data } = await productService.getProductByName(name);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in getProductByName controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, code, price, costPrice, isMeatBovine } = req.body;
    const { status, data } = await productService
      .updateProduct(Number(id), {name, code, price, costPrice, isMeatBovine});
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in updateProduct controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

async function updateCostPriceMeats(req: Request, res: Response) {
  try {
    const { costPrice } = req.body;
    const { status, data } = await productService.updateCostPriceMeats(costPrice);
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in updateCostPriceMeats controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, data } = await productService.deleteProduct(Number(id));
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in deleteProduct controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

async function sugestionCode(req: Request, res: Response) {
  try {
    const { status, data } = await productService.sugestionCode();
    return res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    console.log('Error in sugestionCode controller:', error);
    return res.status(500).json({ message: msgInternalError });
  }
};

export default {
  register,
  getAllProducts,
  getProductById,
  getProductByCode,
  getProductByName,
  updateProduct,
  updateCostPriceMeats,
  deleteProduct,
  sugestionCode,
};
