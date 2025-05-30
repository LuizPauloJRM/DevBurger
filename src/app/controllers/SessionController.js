import * as Yup from 'yup'; // Importa a biblioteca Yup para validação de dados
import User from '../models/User'; // Importa o model User para consultar o banco de dados
import { where } from 'sequelize';
import { response } from 'express';

class SessionController {
    // Método responsável por realizar o login do usuário
    async store(req, resp) {
        // Define o esquema de validação para login com email e senha
        const schema = Yup.object({
            email: Yup.string().email().required(),           // O email deve ser válido e obrigatório
            password: Yup.string().min(6).required(),         // A senha deve ter pelo menos 6 caracteres e ser obrigatória
        });

        // Verifica se os dados enviados na requisição estão de acordo com o esquema
        const isValid = await schema.isValid(req.body);
        if (!isValid) {
            return resp.status(401).json({ error: 'Validation fails' }); // Retorna erro se a validação falhar
        }

        // Desestrutura o email e a senha do corpo da requisição
        const { email, password } = req.body;

        // Procura um usuário com o email informado
        const user = await User.findOne({ where: { email } });

        // Se o usuário não for encontrado, retorna erro
        if (!user) {
            return resp.status(401).json({ error: 'User not found' });
        }

        const isSamePassword = user.comparePassword(password);
        console.log(isSamePassword);
        return response.json({ message: 'session' });
        /*// Verifica se a senha informada bate com a senha do usuário (usando método do model)
        const passwordMatch = await user.checkPassword(password);
        if (!passwordMatch) {
            return resp.status(401).json({ error: 'Password does not match' }); // Senha incorreta
        }

        // Se email e senha estiverem corretos, retorna os dados básicos do usuário
        return resp.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });*/
    }
}

export default new SessionController(); // Exporta uma instância da classe para uso nas rotas
