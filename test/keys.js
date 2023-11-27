import request from 'supertest';
import express from 'express';
import keys from 'node-serialize';

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
            .send('test');

        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('CSRF token is missing or invalid');
    });
});