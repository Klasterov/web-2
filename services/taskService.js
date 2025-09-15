const pool = require('../db');

module.exports = {
  createTask: async (title, description, userId) => {
    const res = await pool.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );
    return res.rows[0];
  },
  
  getTasks: async () => {
    const res = await pool.query(`
      SELECT tasks.*, users.name as user_name, users.email as user_email 
      FROM tasks 
      LEFT JOIN users ON tasks.user_id = users.id 
      ORDER BY tasks.id
    `);
    return res.rows;
  },
  
  getTaskById: async (id) => {
    const res = await pool.query(`
      SELECT tasks.*, users.name as user_name, users.email as user_email 
      FROM tasks 
      LEFT JOIN users ON tasks.user_id = users.id 
      WHERE tasks.id = $1
    `, [id]);
    return res.rows[0];
  },
  
  getTasksByUserId: async (userId) => {
    const res = await pool.query(`
      SELECT tasks.*, users.name as user_name, users.email as user_email 
      FROM tasks 
      LEFT JOIN users ON tasks.user_id = users.id 
      WHERE tasks.user_id = $1 
      ORDER BY tasks.id
    `, [userId]);
    return res.rows;
  },
  
  updateTask: async (id, title, description, completed, userId) => {
    const res = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description),
           completed = COALESCE($3, completed),
           user_id = COALESCE($4, user_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 
       RETURNING *`,
      [title, description, completed, userId, id]
    );
    return res.rows[0];
  },
  
  deleteTask: async (id) => {
    const res = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }
};