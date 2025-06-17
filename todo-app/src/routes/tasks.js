const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// Create a new task
router.post('/', authMiddleware.isAuthenticated, taskController.createTask);

// Get all tasks for the authenticated user
router.get('/', authMiddleware.isAuthenticated, taskController.getTasks);

// Update a task's status
router.put('/:id', authMiddleware.isAuthenticated, taskController.updateTask);

// Delete a task
router.delete('/:id', authMiddleware.isAuthenticated, taskController.deleteTask);

// Get tasks by status
router.get('/status/:status', authMiddleware.isAuthenticated, taskController.getTasksByStatus);

module.exports = router;