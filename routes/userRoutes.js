const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate } = require('express-validation');
const Joi = require('joi');

const userValidation = {
  body: Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
      .min(1)
      .required()
      .messages({
        'string.pattern.base': '"name" poate contine doar litere si spatii',
        'string.empty': '"name" nu poate fi gol',
        'any.required': '"name" este obligatoriu'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': '"email" trebuie sa fie un email valid',
        'string.empty': '"email" nu poate fi gol',
        'any.required': '"email" este obligatoriu'
      }),
  }),
};

const handleValidationErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const errors = err.error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({ 
      error: 'Validation error',
      details: errors 
    });
  }
  next(err);
};

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', validate(userValidation, {}, { abortEarly: false }), handleValidationErrors, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Обновить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *       404:
 *         description: Пользователь не найден
 */
router.put('/:id', validate(userValidation, {}, { abortEarly: false }), handleValidationErrors, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удалён
 *       404:
 *         description: Пользователь не найден
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;