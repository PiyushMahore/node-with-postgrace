import request from 'supertest';
import postgrace from '../index.js';
import { app } from '../app.js';

beforeEach(async () => {
    await postgrace.query('DELETE FROM users');
});

afterAll(async () => {
    await postgrace.end();
});

describe('POST /add-user', () => {
    it('should create a new user', async () => {
        const res = await request(app).post('/add-user').send({
            name: 'Alice',
            email: 'alice@example.com',
            password: 'secure123'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Alice');
    });

    it('should fail when fields are missing', async () => {
        const res = await request(app).post('/add-user').send({
            email: 'bob@example.com'
        });

        expect(res.statusCode).toBe(400);
    });
});

describe('GET /get-user', () => {
    it('should return users', async () => {
        await postgrace.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            ['Charlie', 'charlie@example.com', 'pass123']
        );

        const res = await request(app).get('/get-user');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
