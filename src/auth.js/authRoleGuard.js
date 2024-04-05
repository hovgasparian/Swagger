const RoleMiddleware =
  (...roles) =>
  async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Forbidden: Action' });
      }

      const { role } = req.user;
      const permissionAllowed = roles.includes(role);

      if (!permissionAllowed) {
        req.permissionAllowed = false;
        return res.status(403).json({ message: 'Forbidden: Action' });
      }

      req.permissionAllowed = true;
      return next();
    } catch (error) {
      console.error('Error:', error);
      return res.status(403).json({ message: 'Forbidden: Action', error });
    }
  };
export default RoleMiddleware;
