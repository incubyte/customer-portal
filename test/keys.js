import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import keys from 'node-serialize';

const app = express();

app.use(express.text({type: 'text/plain'}));

app.post('/keys', function(req, res) {
    const unserialized = keys.unserialize(req.body);
    res.end('keys are ' + Object.keys(unserialized));
});

describe('Security Test', () => {
    it('should prevent remote code execution through object deserialization', (done) => {
        const maliciousPayload = '...'; // Replace with a malicious payload

        request(app)
            .post('/keys')
            .send(maliciousPayload)
            .expect(200)
            .end((err, res) => {
                expect(res.text).to.not.contain('keys are');
                done();
            });
    });
});