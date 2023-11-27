import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import expressSession from 'express-session';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(expressSession({
    name: 'my-session-cookie',
    secret: 'my-secret-key',
}));

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

describe('Security Test', () => {
    it('should not expose sensitive information in the response', (done) => {
        request(app)
            .get('/example')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.not.contain(`I'm in danger!`);
                done();
            });
    });
});