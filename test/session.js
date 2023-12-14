import { expect } from 'chai';
import request from 'supertest';
import express from 'express';

const app = express();

// Test for security issue: hard-coded credentials
describe('Hard-coded credentials', () => {
  it('should not contain hard-coded credentials', () => {
    const users = {
      'user1': 'password1',
      'user2': 'password2'
    };

    expect(users).to.not.include.keys('user1', 'user2');
  });
});

// Test for security issue: storing credentials in source code
describe('Storing credentials in source code', () => {
  it('should not store credentials in source code', () => {
    const users = {
      'user1': 'password1',
      'user2': 'password2'
    };

    const data = {
      'user1': 'This is the data for user1',
      'user2': 'This is the data for user2',
    };

    expect(users).to.not.include.keys('user1', 'user2');
    expect(data).to.not.include.keys('user1', 'user2');
  });
});

// Test for security issue: sending credentials in plain text
describe('Sending credentials in plain text', () => {
  it('should send credentials securely', (done) => {
    request(app)
      .post('/session')
      .send({
        username: 'user1',
        password: 'password1'
      })
      .expect(302)
      .expect('Location', 'data?username=user1')
      .end(done);
  });
});

// Test for security issue: not checking if user is logged in
describe('Checking if user is logged in', () => {
  it('should check if user is logged in', (done) => {
    request(app)
      .get('/data?username=user1')
      .expect(403)
      .expect('not logged in')
      .end(done);
  });
});