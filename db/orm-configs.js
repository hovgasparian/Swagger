import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'postgres',
  database: 'Node_2',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

export default sequelize;
