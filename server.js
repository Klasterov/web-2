const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Salut, serverul lucreaza!');
});

app.listen(port, () => {
  console.log(`Serverul ruleaza pe portul :${port}`);
});
