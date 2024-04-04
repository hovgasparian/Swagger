class UserController {
  async getAll(req, res) {
    try {
      const users = await req.app.services.users.getAll();
      const userCount = users.length;
      res.json({ userCount, users });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await req.app.services.users.getById(id);
      res.status(201).json({
        status: 'status',
        message: user,
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async createUser(req, res) {
    const user = req.body;
    try {
      const createdUser = await req.app.services.users.createUser(user);
      res.json({ createdUser });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedUserData = req.body;
    try {
      const updatedUser = await req.app.services.users.updateUser(
        userId,
        updatedUserData
      );
      res.json({ updatedUser });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async improveUser(req, res) {
    const { id } = req.params;
    const newUserData = req.body;
    try {
      const newUser = await req.app.services.users.improveUser(id, newUserData);
      res.json({
        status: 'Success',
        message: newUser,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await req.app.services.users.deleteUser(id);
      res.json({
        status: 'success',
        message: deletedUser,
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}

export default UserController;
