import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'secret',
    cookie: {
        secure: true,
        httpOnly: true // Added httpOnly flag to ensure cookie is not accessible by client-side JavaScript
    }
}));

app.post('/session', function(req, res) {
    // Test code for /session route
});

app.get('/data', function(req, res) {
    // Test code for /data route
});

describe('Session Middleware', function() {
    it('should set the httpOnly flag to true', function() {
        const sessionMiddleware = app._router.stack.find(middleware => middleware.name === 'session');
        expect(sessionMiddleware.cookie.httpOnly).to.be.true;
    });
});

describe('/session route', function() {
    it('should set the loggedIn flag to true and redirect to /data route if username and password are correct', function(done) {
        request(app)
            .post('/session')
            .send({ username: 'user1', password: 'password1' })
            .expect(302)
            .expect('Location', 'data?username=user1')
            .end(done);
    });

    it('should return 401 status code if username or password is incorrect', function(done) {
        request(app)
            .post('/session')
            .send({ username: 'user1', password: 'wrongpassword' })
            .expect(401)
            .end(done);
    });
});

describe('/data route', function() {
    it('should return 403 status code if user is not logged in', function(done) {
        request(app)
            .get('/data')
            .expect(403)
            .end(done);
    });

    it('should return the data for the specified username if user is logged in', function(done) {
        request(app)
            .get('/data?username=user1')
            .expect(200)
            .expect('This is the data for user1')
            .end(done);
    });
});