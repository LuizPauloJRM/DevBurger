import { Sequelize } from "sequelize"; // Importando Sequelize
import User from "../app/models/User";// Importando o modelo User
import configDatabase from "../config/database"; // Arquivo que deve exportar as configs do banco
import Product from "../app/models/Product";// Exportando model product



const models = [User, Product];// Lista de modelos que serão inicializados

class Database {// Classe Database para gerenciar a conexão com o banco de dados
    constructor() {
        this.init();
    }

    init() {// Método para inicializar a conexão com o banco de dados e os modelos
        this.connection = new Sequelize(configDatabase); // Passando as configs corretamente
        models.forEach(model => model.init(this.connection)); // Iniciando os models
    }
}

export default new Database();
