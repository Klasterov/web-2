const UserService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log('Creating user with data:', req.body);
    
    const { name, email } = req.body;
    
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = await UserService.createUser(
      name.trim(),
      email.toLowerCase().trim()
    );

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email } = req.body;
    
    if (email && email !== user.email) {
      const existingUser = await UserService.findUserByEmail(email);
      if (existingUser && existingUser.id !== parseInt(req.params.id)) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
    }

    const updatedUser = await UserService.updateUser(
      req.params.id,
      name ? name.trim() : user.name,
      email ? email.toLowerCase().trim() : user.email
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = await UserService.deleteUser(req.params.id);
    res.json({ 
      message: 'User deleted successfully',
      user: deletedUser 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};