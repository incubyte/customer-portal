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

describe('GET /example', () => {
    it('should return "I\'m in danger!"', async () => {
        const res = await request(app).get('/example');
        expect(res.text).toBe("I'm in danger!");
    });
});