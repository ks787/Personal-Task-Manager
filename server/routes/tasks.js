const express = require('express');
const router = express.Router();

const taskService = require('../services/taskService');
const { validateTitle, validateDescription, validateDueDate } = require('../middleware/validate');

// GET /api/tasks — list all tasks (newest first)
router.get('/', (req, res, next) => {
  try {
    const tasks = taskService.getAllTasks();
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks — create a new task
router.post('/', validateTitle, validateDescription, validateDueDate, (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = taskService.createTask({ title, description, dueDate });
    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/tasks/reorder — reorder tasks array
router.patch('/reorder', (req, res, next) => {
  try {
    const { taskIds } = req.body;
    if (!Array.isArray(taskIds)) {
      return res.status(400).json({ error: 'taskIds must be an array of strings' });
    }
    const tasks = taskService.reorderTasks(taskIds);
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id — update title, description, or dueDate
router.put('/:id', validateTitle, validateDescription, validateDueDate, (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = taskService.updateTask(req.params.id, { title, description, dueDate });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ task });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/tasks/:id/toggle — flip completed status
router.patch('/:id/toggle', (req, res, next) => {
  try {
    const task = taskService.toggleTask(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ task });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id — remove a task
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = taskService.deleteTask(req.params.id);

    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
