import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
//import User from './app/models/User';

const routes = new Router();

routes.post('/users', UserController.store);             // Criar usuário
routes.post('/session', SessionController.store); // Login de usuário 
routes.post('/products', ProductController.store);// Products

export default routes;
