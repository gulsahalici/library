import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Book from './Book';

class Borrow extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public rating!: number | null;
}

Borrow.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id',
    },
  },
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Borrow',
});

User.hasMany(Borrow);
Book.hasMany(Borrow);
Borrow.belongsTo(User);
Borrow.belongsTo(Book);

export default Borrow;
