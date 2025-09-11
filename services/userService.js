const User = require('../models/userModel');

let users = [];
let currentId = 1;

module.exports = {
  createUser: (name) => {
    const newUser = new User(currentId++, name);
    users.push(newUser);
    return newUser;
  },
  getUsers: () => {
    return users;
  },
  getUserById: (id) => {
    return users.find(u => u.id === id);
  },

  updateUser: (id, name) => {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    user.name = name;
    return user;
  },
  deleteUser: (id) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  }
};
