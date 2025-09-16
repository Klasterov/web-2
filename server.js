require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { ValidationError } = require('express-validation');

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const app = express();

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'ro'],
    ns: ['validation', 'errors', 'success'],
    defaultNS: 'validation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    }
  });

app.use(middleware.handle(i18next));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send(req.t('welcome'));
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serverul ruleaza pe portul :${port}`);
});
