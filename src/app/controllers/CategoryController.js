import * as Yup from 'yup';
import Category from './../models/Category';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }


        const { name } = request.body;

        const category = await Category.create({
            name,

        });

        return response.status(201).json({ category });
    }

    async index(request, response) {
        const categories = await Category.findAll();
        console.log({ userId: request.userId })

        return response.json(category);
    }
}

export default new CategoryController();