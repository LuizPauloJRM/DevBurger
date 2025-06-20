import express from 'express'; // Importa o framework Express
import routes from './routes'; // Importa as rotas definidas no arquivo routes.js
import './database'; // Importa a configuração do banco de dados
import { resolve } from 'node:path';
import cors from 'cors';

class App {
    constructor() {
        this.app = express();         // 1. Cria a aplicação express
        this.middlewares();           // 2. Configura os middlewares
        this.routes();                // 3. Configura as rotas
        this.exceptionHandler();      // 4. Configura o tratamento global de erros
    }

    middlewares() {
        this.app.use(express.json()); // Middleware que permite a leitura de JSON no corpo das requisições
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
        this.app.use(cors());
    }

    routes() {
        this.app.use(routes);         // Usa as rotas definidas no arquivo routes.js
    }

    exceptionHandler() {
        // Middleware para tratamento global de erros (opcional)
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).json({ error: 'Invalid JSON' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().app;       // Exporta a instância já configurada da aplicação