import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/orm-configs.js';

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelname: 'Roles',
    createdAt: false,
    updatedAt: false,
  }
);

Role.sync();

export default Role;
