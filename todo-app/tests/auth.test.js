const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/signup')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should log in an existing user', async () => {
        const user = new User({
            username: 'testuser',
            password: await bcrypt.hash('testpassword', 10)
        });
        await user.save();

        const response = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
    });

    it('should not log in with incorrect password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should log out a user', async () => {
        const response = await request(app)
            .post('/logout');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Logout successful');
    });
});