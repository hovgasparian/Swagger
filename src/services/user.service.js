import Role from '../models/role.model.js';
import UserRole from '../models/userRole.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {
    const users = await this.models.users.findAll({
      include: {
        model: UserRole,
        as: 'roles',
        include: [{ model: Role, as: 'role' }],
      },
    });
    return users;
  }

  async getById(id) {
    const user = await this.models.users.findOne({
      where: { id },
      include: {
        model: UserRole,
        as: 'roles',
        include: [{ model: Role, as: 'role' }],
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async signUp(body) {
    const { name, email, password, roleId } = body;
    const role = await this.models.roles.findOne({ where: { id: roleId } });
    if (!role) {
      throw new Error('Role not found');
    }
    const user = await this.models.users.create(
      { name, email, password },
      {
        include: {
          model: UserRole,
          as: 'roles',
          include: [{ model: Role, as: 'role' }],
        },
      }
    );
    await this.models.userRoles.create({
      userId: user.id,
      roleId: role.id,
    });
    if (!user) {
      throw new Error(' The request was malformed or invalid.');
    }
    return user;
  }

  async signIn(body) {
    const { name, email, password } = body;
    const user = await this.models.users.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Passwords doesnt match');
    }
    const token = jwt.sign({ email: user.email }, process.env.SECRET_WORD, {
      expiresIn: '24h',
    });
    return { user, token };
  }

  async updateUser(userId, updatedUserData) {
    const user = await this.models.users.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await user.update(updatedUserData);
    if (!updatedUser) {
      throw new Error(' The request was malformed or invalid.');
    }
    return updatedUser;
  }

  async improveUser(id, newUserData) {
    const user = await this.models.users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    const result = await user.update(newUserData);
    if (!result) {
      throw new Error(' The request was malformed or invalid.');
    }
    return result;
  }

  async deleteUser(id) {
    const result = await this.models.users.destroy({ where: { id } });
    if (!result) {
      throw new Error('User not found');
    }
    return result;
  }
}

export default UserService;
