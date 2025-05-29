/**
 * store : Cadastrar novo usuário
 * index : Listar vários usuários
 * show : Exibir um usuário específico
 * update : Atualizar um usuário
 * delete : Deletar um usuário
 */

// Controller para conectar com o banco de dados e manipular os dados dos usuários
import User from "../models/User"; // Importa o model User (estrutura do usuário no banco)
import { v4 } from "uuid"; // Importa a função v4 do pacote uuid para gerar IDs únicos
import * as Yup from "yup"; // Importa o Yup para validação de dados
class UserController {
    // Método para cadastrar um novo usuário no banco de dados
    async store(req, resp) {
        const schema = Yup.object({
            name: Yup.string().required(), // Nome do usuário é obrigatório
            email: Yup.string().email().required(), // Email deve ser um email válido e é obrigatório
            password_hash: Yup.string().required(), // Senha (hash) é obrigatória
            admin: Yup.boolean().default(false), // Campo admin é booleano, padrão é false
        });
        const validation = schema.isValid(req.body); // Valida os dados recebidos no corpo da requisição
        console.log("Validação do usuário:", validation); // Exibe o resultado da validação no console
        if (!validation) {
            // Se a validação falhar, retorna erro 400 (Bad Request) com mensagem de erro
            return resp.status(400).json({
                error: "Erro de validação",
                message: "Dados inválidos ou ausentes",
            });
        }

        try {
            // Extrai os dados enviados pelo cliente no corpo da requisição
            const { name, email, password_hash, admin } = req.body;
            const userExists = await User.findOne({ where: { email } }); // Verifica se já existe um usuário com o mesmo email
            if (userExists) {
                // Se já existir um usuário com o mesmo email, retorna erro 400 (Bad Request)
                return resp.status(400).json({
                    error: "Usuário já existe",
                    message: "Já existe um usuário cadastrado com este email",
                });
                console.log("Usuário já existe:", userExists);
            }

            // Cria um novo usuário no banco de dados com os dados recebidos
            const user = await User.create({
                id: v4(), // Gera um ID único usando uuid v4
                name,     // Nome do usuário
                email,    // Email do usuário
                password_hash, // Senha (já criptografada, se aplicável)
                admin,    // Booleano que indica se o usuário é administrador
            });

            // Retorna resposta com status 201 (Created) e os dados do novo usuário criado
            return resp.status(201).json({
                id: user.id,    // ID único do usuário
                name: user.name,
                email: user.email,
                admin: user.admin
            });

        } catch (error) {
            // Em caso de erro, exibe o erro no console e retorna resposta com erro 500 (Internal Server Error)
            console.error("Erro ao criar usuário:", error);
            return resp.status(500).json({
                error: "Erro ao criar usuário",
                details: error.message, // Exibe a mensagem específica do erro para facilitar o debug
            });
        }
    }
}

export default new UserController(); // Exporta uma instância da classe para uso nas rotas
