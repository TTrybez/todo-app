const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Task = require('../src/models/Task');
const User = require('../src/models/User');

describe('Task Management', () => {
    let user;
    let token;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        user = await User.create({
            username: 'testuser',
            password: 'password123'
        });

        const res = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        token = res.body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Task.deleteMany({});
        await mongoose.connection.close();
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'This is a test task',
                status: 'pending'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('task');
        expect(res.body.task.title).toBe('Test Task');
    });

    it('should retrieve all tasks for the user', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('tasks');
        expect(res.body.tasks.length).toBeGreaterThan(0);
    });

    it('should update a task status', async () => {
        const task = await Task.create({
            title: 'Update Task',
            description: 'This task will be updated',
            status: 'pending',
            user_id: user._id
        });

        const res = await request(app)
            .patch(`/tasks/${task._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'completed'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.task.status).toBe('completed');
    });

    it('should delete a task', async () => {
        const task = await Task.create({
            title: 'Delete Task',
            description: 'This task will be deleted',
            status: 'pending',
            user_id: user._id
        });

        const res = await request(app)
            .delete(`/tasks/${task._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    });
});