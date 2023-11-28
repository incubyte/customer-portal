import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';

const app = express();

// Set up session middleware with secure and httpOnly options
app.use(session({
    secret: 'secret',
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'example.com'
    }
}));

// Set up routes
app.post('/session', function(req, res) {
    // Code for handling login
});

app.get('/data', function(req, res) {
    // Code for handling data retrieval
});

describe('Session Middleware', function() {
    it('should set secure and httpOnly options for session cookies', function(done) {
        request(app)
            .post('/session')
            .send({
                username: 'user1',
                password: 'password1'
            })
            .expect(302)
            .expect('Set-Cookie', /secure/)
            .expect('Set-Cookie', /httpOnly/)
            .end(done);
    });
});

describe('Login Endpoint', function() {
    it('should return 401 status code for incorrect username or password', function(done) {
        request(app)
            .post('/session')
            .send({
                username: 'user1',
                password: 'wrongpassword'
            })
            .expect(401)
            .end(done);
    });

    it('should set loggedIn session variable to true for correct username and password', function(done) {
        request(app)
            .post('/session')
            .send({
                username: 'user1',
                password: 'password1'
            })
            .expect(302)
            .expect('Location', 'data?username=user1')
            .end(function(err, res) {
                if (err) return done(err);

                // Check if loggedIn session variable is set to true
                expect(res.req.session.loggedIn).to.be.true;
                done();
            });
    });
});

describe('Data Endpoint', function() {
    it('should return 403 status code if user is not logged in', function(done) {
        request(app)
            .get('/data')
            .expect(403)
            .end(done);
    });

    it('should return the data for the specified username if user is logged in', function(done) {
        request(app)
            .post('/session')
            .send({
                username: 'user1',
                password: 'password1'
            })
            .expect(302)
            .expect('Location', 'data?username=user1')
            .end(function(err, res) {
                if (err) return done(err);

                request(app)
                    .get('/data?username=user1')
                    .expect(200)
                    .expect('This is the data for user1')
                    .end(done);
            });
    });
});