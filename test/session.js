import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import session from 'express-session';

const app = express();
app.use(session({ secret: 'secret', cookie: { secure: true } }));

describe('Session Middleware', () => {
  it('should set secure flag on session cookie', () => {
    const sessionMiddleware = app._router.stack.find(
      (middleware) => middleware.handle.name === 'session'
    );

    expect(sessionMiddleware.handle.cookie.secure).to.be.true;
  });
});

describe('POST /session', () => {
  it('should redirect to data page if username and password are correct', (done) => {
    request(app)
      .post('/session')
      .send({ username: 'user1', password: 'password1' })
      .expect(302)
      .expect('Location', 'data?username=user1')
      .end(done);
  });

  it('should return 401 if username or password is incorrect', (done) => {
    request(app)
      .post('/session')
      .send({ username: 'user1', password: 'wrongpassword' })
      .expect(401)
      .expect('wrong username or password')
      .end(done);
  });
});

describe('GET /data', () => {
  it('should return 403 if user is not logged in', (done) => {
    request(app)
      .get('/data')
      .expect(403)
      .expect('not logged in')
      .end(done);
  });

  it('should return the data for the specified user if logged in', (done) => {
    request(app)
      .get('/data?username=user1')
      .set('Cookie', 'connect.sid=s%3AsomeSessionId')
      .expect(200)
      .expect('This is the data for user1')
      .end(done);
  });
});