import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class User extends Model {
  public id!: number;
  public name!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
