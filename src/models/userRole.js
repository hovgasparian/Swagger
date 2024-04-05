import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/orm-configs.js';

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    createdAt: false,
    updatedAt: false,
  }
);

UserRole.sync();

export default UserRole;
