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
        // Esquema de validação dos dados de entrada
        const schema = Yup.object({
            name: Yup.string().required("Nome é obrigatório"),
            email: Yup.string().email("Email inválido").required("Email é obrigatório"),
            password: Yup.string().required("Senha é obrigatória"),
            admin: Yup.boolean().default(false),
        });

        try {
            // Validação dos dados recebidos
            await schema.validate(req.body, { abortEarly: false });

            const { name, email, password, admin } = req.body;

            // Verifica se o usuário com o mesmo email já existe
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return resp.status(400).json({
                    error: "Usuário já existe",
                    message: "Já existe um usuário cadastrado com este email",
                });
            }

            // Cria o usuário no banco (hook beforeSave criará o password_hash)
            const user = await User.create({
                id: v4(),
                name,
                email,
                password, // <- passa o password puro, o hook cuidará da hash
                admin,
            });

            // Retorna o usuário criado (sem mostrar o hash)
            return resp.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            });
        } catch (error) {
            if (error.name === "ValidationError") {
                return resp.status(400).json({
                    error: "Erro de validação",
                    messages: error.errors,
                });
            }

            // Erro inesperado
            console.error("Erro ao criar usuário:", error);
            return resp.status(500).json({
                error: "Erro interno ao criar usuário",
                details: error.message,
            });
        }
    }
}

export default new UserController(); // Exporta uma instância da classe para uso nas rotas
