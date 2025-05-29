import express from 'express'; // Importa o framework Express
import routes from './routes'; // Importa as rotas definidas no arquivo routes.js
import './database'; // Importa a configuração do banco de dados
class App {
    constructor(){
        this.app = express();         // 1. Cria a aplicação express
        this.middlewares();          // 2. Configura os middlewares
        this.routes();               // 3. Configura as rotas
    }

    middlewares(){
        this.app.use(express.json()); // Middleware que permite a leitura de JSON no corpo das requisições
    }

    routes(){
        this.app.use(routes);         // Usa as rotas definidas no arquivo routes.js
    }
}

export default new App().app;       // Exporta a instância já configurada da aplicação
