import { Router } from 'express';
import userController from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/login', userController.login);

export default userRoutes;