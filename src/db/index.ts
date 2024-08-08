import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('library_management', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
