import { Router } from "express";

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

export default routes; // Exporta as rotas definidas para serem usadas na aplicação principal