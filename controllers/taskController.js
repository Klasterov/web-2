const taskService = require('../services/taskService');
const userService = require('../services/userService');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await taskService.getTaskById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error getting user tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    
    const user = await userService.getUserById(Number(userId));
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const task = await taskService.createTask(
      title.trim(),
      description ? description.trim() : null,
      Number(userId)
    );

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed, userId } = req.body;

    if (userId !== undefined) {
      const user = await userService.getUserById(Number(userId));
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    const task = await taskService.updateTask(
      id,
      title ? title.trim() : null,
      description ? description.trim() : null,
      completed,
      userId ? Number(userId) : null
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTask = await taskService.deleteTask(id);
    
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};