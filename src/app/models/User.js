import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,         // Não vai para o banco
        password: DataTypes.STRING,     // Vai com a senha criptografada
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // CORRETO AQUI
      }
    });

    return this;
  }

  // Método de instância para validar senha no login
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
