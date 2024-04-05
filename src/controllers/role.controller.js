class RoleController {
  async getAll(req, res) {
    try {
      const roles = await req.app.services.roles.getAll();
      const count = roles.length
      res.status(201).json({
        status: 'Success',
        message: {count, roles},
      });
    } catch (error) {
      res.status(404).json({
        status: 'Roles doesnt found',
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const role = await req.app.services.roles.getById(id);
      res.status(201).json({
        status: 'Success',
        message: role,
      });
    } catch (error) {
      res.status(404).json({
        status: 'Role doesnt found',
        message: error.message,
      });
    }
  }
  async createRole(req, res) {
    const body = req.body;
    try {
      const role = await req.app.services.roles.createRole(body);
      res.status(201).json({
        status: 'Success',
        message: role,
      });
    } catch (error) {
      res.status(404).json({
        status: 'Fail',
        message: error.message,
      });
    }
  }
}

export default RoleController;
