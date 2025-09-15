const { Pool } = require('pg');

const directPool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

module.exports = {
  createUser: async (name, email) => {
    const res = await directPool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return res.rows[0];
  },
  
  getUsers: async () => {
    const res = await directPool.query('SELECT * FROM users ORDER BY id');
    return res.rows;
  },
  
  getUserById: async (id) => {
    const res = await directPool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },
  
  findUserByEmail: async (email) => {
    const res = await directPool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return res.rows[0];
  },
  
  updateUser: async (id, name, email) => {
    const res = await directPool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return res.rows[0];
  },
  
  deleteUser: async (id) => {
    const res = await directPool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }
};