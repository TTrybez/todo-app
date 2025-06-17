const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.session.userId;

    try {
        const newTask = new Task({
            title,
            description,
            status: 'pending',
            user_id: userId
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
    const userId = req.session.userId;
    const { status } = req.query;

    try {
        const tasks = await Task.find({ user_id: userId, status: status || { $ne: 'deleted' } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const deletedTask = await Task.findByIdAndUpdate(taskId, { status: 'deleted' }, { new: true });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};