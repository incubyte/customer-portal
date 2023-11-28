import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';

const app = express();

// Set up session middleware with default settings
app.use(session({ secret: 'secret' }));

// Import the code that contains the security issue
import './index';

describe('Session Middleware', () => {
  it('should set the secure flag to true', () => {
    const sessionMiddleware = app._router.stack.find(
      (middleware) => middleware.handle.name === 'session'
    );

    expect(sessionMiddleware.cookie.secure).to.be.true;
  });

  it('should set the httpOnly flag to true', () => {
    const sessionMiddleware = app._router.stack.find(
      (middleware) => middleware.handle.name === 'session'
    );

    expect(sessionMiddleware.cookie.httpOnly).to.be.true;
  });

  it('should set the domain to example.com', () => {
    const sessionMiddleware = app._router.stack.find(
      (middleware) => middleware.handle.name === 'session'
    );

    expect(sessionMiddleware.cookie.domain).to.equal('example.com');
  });
});

// Run the tests
describe('Session Routes', () => {
  it('should return 403 status code if not logged in', (done) => {
    request(app)
      .get('/data')
      .expect(403, 'not logged in', done);
  });

  it('should return 401 status code if wrong username or password', (done) => {
    request(app)
      .post('/session')
      .send({ username: 'user1', password: 'wrongpassword' })
      .expect(401, 'wrong username or password', done);
  });

  it('should return the data for the logged in user', (done) => {
    request(app)
      .post('/session')
      .send({ username: 'user1', password: 'password1' })
      .expect(302)
      .expect('Location', 'data?username=user1')
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/data?username=user1')
          .expect(200, 'This is the data for user1', done);
      });
  });
});