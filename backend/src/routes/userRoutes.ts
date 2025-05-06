import { Router } from 'express';
import userController from '../controllers/userController';

const userRoutes = Router();

userRoutes.get('/', userController.getAll);
userRoutes.post('/create', userController.create);
userRoutes.post('/login', userController.login);
userRoutes.put('/edit/:id', userController.updateUser);

export default userRoutes;