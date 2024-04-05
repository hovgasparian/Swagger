class RoleService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {
    const result = await this.models.roles.findAll({});
    return result;
  }

  async getById(id) {
    const result = await this.models.roles.findAll({ Where: { id } });
    return result;
  }

  async createRole(body) {
    const result = await this.models.roles.create({ ...body });
    return result;
  }
}

export default RoleService;
