const Task = require('../models/taskModel');

let tasks = [];
let currentId = 1;

module.exports = {
  createTask: (title, description, userId) => {
    const newTask = new Task(currentId++, title, description, userId, false);
    tasks.push(newTask);
    return newTask;
  },
  getTasks: () => tasks,
  getTaskById: (id) => tasks.find(t => t.id === id),
  getTasksByUserId: (userId) => tasks.filter(t => t.userId === userId),
  updateTask: (id, title, description, completed) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    return task;
  },
  deleteTask: (id) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return null;
    const deletedTask = tasks.splice(taskIndex, 1);
    return deletedTask[0];
  }};