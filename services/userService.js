const pool = require('../db');

module.exports = {
  createUser: async (name, email) => {
    const res = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return res.rows[0];
  },
  
  getUsers: async () => {
    const res = await pool.query('SELECT * FROM users ORDER BY id');
    return res.rows;
  },
  
  getUserById: async (id) => {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },
  
  findUserByEmail: async (email) => {
    const res = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return res.rows[0];
  },
  
  updateUser: async (id, name, email) => {
    const res = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return res.rows[0];
  },
  
  deleteUser: async (id) => {
    const res = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }
};