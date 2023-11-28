import request from 'supertest';
import express from 'express';

const app = express();

app.use(expressSession({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

describe('Security Test', () => {
    it('should not expose sensitive information in the response', async () => {
        const response = await request(app).get('/example');
        expect(response.text).not.toContain("I'm in danger!");
    });
});