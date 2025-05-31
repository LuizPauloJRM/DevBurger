import { Sequelize } from "sequelize"; // Importando Sequelize

import User from "../app/models/User"; // Importando o modelo User
import configDatabase from "../config/database"; // Arquivo que deve exportar as configs do banco
import Product from "../app/models/Product"; // Importando model product
import Category from "../app/models/Category";

const models = [User, Product, Category]; // Lista de modelos que serão inicializados

class Database { // Classe Database para gerenciar a conexão com o banco de dados
    constructor() {
        this.init();
    }

    init() { // Método para inicializar a conexão com o banco de dados e os modelos
        this.connection = new Sequelize(configDatabase); // Passando as configs corretamente
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models),
            );
    }
}

export default new Database();