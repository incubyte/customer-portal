import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'secret',
    cookie: {
        secure: true
    }
}));

app.get('/data', function(req, res) {
    if (!req.session || !req.session.loggedIn) {
        res.status(403).end('not logged in');
    } else {
        const username = req.query.username;
        res.end(data[username]);
    }
});

describe('GET /data', function() {
    it('should return 403 if not logged in', function(done) {
        request(app)
            .get('/data')
            .expect(403)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.text).to.equal('not logged in');
                done();
            });
    });
});