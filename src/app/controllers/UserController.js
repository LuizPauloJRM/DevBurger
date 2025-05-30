/**
 * store : Cadastrar novo usuário
 * index : Listar vários usuários
 * show : Exibir um usuário específico
 * update : Atualizar um usuário
 * delete : Deletar um usuário
 */
import { v4 } from 'uuid';
import User from '../models/User';

class UserController {
    async store(request, response) {
        const { name, email, password, admin } = request.body;

        try {
            const user = await User.create({
                id: v4(),
                name,
                email,
                password,
                admin,
            });
            return response.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            });
        } catch (error) {
            return response.status(500).json({ error: "Internal server error", details: error.message });
        }
    }
}
export default new UserController();