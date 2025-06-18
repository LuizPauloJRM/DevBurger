/**
 * store : Cadastrar novo usuário
 * index : Listar vários usuários
 * show : Exibir um usuário específico
 * update : Atualizar um usuário
 * delete : Deletar um usuário
 */
import { v4 } from 'uuid';
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });
        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        /*const validation = await schema.isValid(request.body);
        console.log(validation);*/

        /*if (!isValid) {
            return response.status(400).json({ error: 'Make sure data is correct' })
        }*/
        const { name, email, password, admin } = request.body;

        const userExists = await User.findOne({
            where: {
                email,
            }
        });

        /**
         * null 
         * undefined 
         * ""
         * 0 , false 
         * {} ,[] , 1 true
         */

        if (userExists) {
            return response.status(400).json({ error: 'User already exists' });
        }

        //console.log(userExists);


        //try{
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
        /*} catch (error) {
            return response.status(500).json({ error: "Internal server error", details: error.message });
        }*/
    }
}
export default new UserController();