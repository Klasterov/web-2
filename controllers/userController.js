const userService = require('../services/userService');

module.exports = {
  createUser: (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Numele' });
    }
    const newUser = userService.createUser(name);
    res.status(201).json(newUser);
  },
  getUsers: (req, res) => {
    const users = userService.getUsers();
    res.json(users);
  },
  getUserById: (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Userul nu este gasit' });
    }
    res.json(user);
  },
  updateUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Numele obligatoriu' });
    }
    const updatedUser = userService.updateUser(userId, name);
    if (!updatedUser) {
      return res.status(404).json({ error: 'Userul nu este gasit' });
    }
    res.json(updatedUser);
  },
  deleteUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const deletedUser = userService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Userul nu este gasit' });
    }
    res.json(deletedUser);
  }
};
