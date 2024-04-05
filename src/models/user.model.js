import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/orm-configs.js';
import * as bcrypt from 'bcrypt';
import Role from './role.model.js';
import UserRole from './userRole.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      defaultValue: null,
      set(value) {
        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      },
    },
  },
  {
    sequelize,
    modelName: 'Users',
    createdAt: false,
    updatedAt: false,
  }
);

User.sync();

User.hasMany(UserRole, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'roles',
});
UserRole.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'userId',
  as: 'user',
});
UserRole.hasOne(Role, {
  foreignKey: 'id',
  sourceKey: 'roleId',
  as: 'role',
});

export default User;
