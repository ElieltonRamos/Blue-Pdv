import { Router } from 'express';
import productController from '../controllers/productController';

const productRoutes = Router();

productRoutes.post('/register', productController.register);

export default productRoutes;