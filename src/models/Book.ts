import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public averageRating!: number;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Book',
});

export default Book;
