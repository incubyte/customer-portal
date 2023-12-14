const request = require('supertest');
const express = require('express');
const keys = require('node-serialize');

const app = express();

app.use(express.text({type: 'text/plain'}))
app.post('/keys', function(req, res) {
    const unserialized = keys.unserialize(req.body);
    res.end('keys are ' + Object.keys(unserialized));
});

describe('CSRF Middleware', () => {
    it('should have CSRF middleware', async () => {
        const response = await request(app)
            .post('/keys')
            .send('data=example');

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('CSRF token missing or invalid');
    });
});