import request from 'supertest';
import express from 'express';

const app = express();

app.use(expressSession({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 3600000) // Set expiration date for persistent cookies
    }
}));

describe('Security Test', () => {
    it('should return "I\'m in danger!"', async () => {
        const response = await request(app).get('/example');
        expect(response.text).toBe("I'm in danger!");
    });
});