import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import authMiddleware from './middlewares/auth';
//import User from './app/models/User';


const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);             // Criar usuário
routes.post('/session', SessionController.store); // Login de usuário 

routes.use(authMiddleware);//Rotas com token
routes.post('/products', upload.single('file'), ProductController.store);// Products
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);// Category
routes.get('/categories', CategoryController.index);

export default routes;



//request-> middleware -> controller -> model -> database -> response