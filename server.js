const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { ValidationError } = require('express-validation');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Salut, serverul lucreaza!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errors = [];
    for (const key in err.details) {
      err.details[key].forEach(detail => {
        errors.push({
          field: detail.path.join('.'),
          message: detail.message
        });
      });
    }
    return res.status(err.statusCode).json({ errors });
  }
  return res.status(500).json({ error: err.message });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serverul ruleaza pe portul :${port}`);
});