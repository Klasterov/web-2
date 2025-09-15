const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validate, Joi } = require('express-validation');

const taskValidation = {
    body: Joi.object({
        title: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.empty': '"title" nu poate fi gol',
            'any.required': '"title" este obligatoriu'
        }),
        description: Joi.string()
        .optional()
        .messages({
            'string.base': '"description" trebuie sa fie un sir de caractere'
        })
        ,
        userId: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': '"userId" trebuie sa fie un numar',
            'number.integer': '"userId" trebuie sa fie un numar intreg',
            'any.required': '"userId" este obligatoriu'
        })
        ,
    }),
};

const taskUpdateValidation = {
    body: Joi.object({
        title: Joi.string().min(1),
        description: Joi.string().allow(''),
        userId: Joi.number().integer(),
        completed: Joi.boolean(),
    }),
};

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Управление задачами
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить все задачи
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Список задач
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Получить задачу по id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача найдена
 *       404:
 *         description: Задача не найдена
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     summary: Получить задачи пользователя
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список задач пользователя
 */
router.get('/user/:userId', taskController.getTasksByUserId);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Создать задачу
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Задача создана
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', validate(taskValidation, {} , {}),taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Обновить задачу
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Задача обновлена
 *       404:
 *         description: Задача не найдена
 */
router.put('/:id', validate(taskUpdateValidation, {} , {}),taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;