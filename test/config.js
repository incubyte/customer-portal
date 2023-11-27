import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';

const app = express();
app.use(bodyParser.json());
app.use(expressSession());

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

describe('CSRF Middleware', () => {
    it('should have CSRF middleware', async () => {
        const response = await request(app).get('/example');
        expect(response.statusCode).toBe(403);
    });
});