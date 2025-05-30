import Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,

            },

            {
                sequelize,
                tableName: 'products',

            }
        );
        return this;
    }
}

export default Category;