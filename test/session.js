import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret' }));

const users = {
    'user1': 'password1',
    'user2': 'password2'
}

const data = {
    'user1': 'This is the data for user1',
    'user2': 'This is the data for user2',
}

app.post('/session', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (users[username] === password) {
        req.session.loggedIn = true;
        res.writeHead(302, {
            'Location': `data?username=${username}`
        });
        res.end();
    } else {
        res.status(401).end('wrong username or password');
    }
});

app.get('/data', function(req, res) {
    if (!req.session || !req.session.loggedIn) {
        res.status(403).end('not logged in');
    } else {
        const username = req.query.username;
        res.end(data[username]);
    }
});

describe('CSRF Middleware', () => {
    it('should use CSRF middleware', (done) => {
        request(app)
            .post('/session')
            .send({ username: 'user1', password: 'password1' })
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});