import request from 'supertest';
import express from 'express';

const app = express();

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

describe('Security Test', () => {
    it('should not use the default session cookie name', async () => {
        const response = await request(app).get('/example');
        expect(response.headers['set-cookie']).not.toContain('connect.sid');
    });
});