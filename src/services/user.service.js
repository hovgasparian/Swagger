class UserService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {
    const users = await this.models.users.findAll({});
    return users;
  }

  async getById(id) {
    const user = await this.models.users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(body) {
    const user = await this.models.users.create({ ...body });
    if (!user) {
      throw new Error(' The request was malformed or invalid.');
    }
    return user;
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
