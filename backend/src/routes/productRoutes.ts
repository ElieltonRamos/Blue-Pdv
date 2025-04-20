import { Router } from 'express';
import productController from '../controllers/productController';

const productRoutes = Router();

productRoutes.get('/', productController.getAllProducts);
productRoutes.get('/:id', productController.getProductById);
productRoutes.put('/:id', productController.updateProduct);
productRoutes.delete('/:id', productController.deleteProduct);
productRoutes.post('/register', productController.register);
productRoutes.get('/code/:code', productController.getProductByCode);
productRoutes.get('/name/:name', productController.getProductByName);
productRoutes.get('/sugestion/code', productController.sugestionCode);

export default productRoutes;