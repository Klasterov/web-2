const taskService = require('../services/taskService');

exports.getAllTasks = (req, res) => {
  res.json(taskService.getTasks());
};

exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskService.getTaskById(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.getTasksByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  const tasks = taskService.getTasksByUserId(userId);
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !userId) return res.status(400).json({ message: 'Title and userId are required' });
  const task = taskService.createTask(title, description, userId);
  res.status(201).json(task);
};

exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const task = taskService.updateTask(id, title, description, completed);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedTask = taskService.deleteTask(id);
  if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};