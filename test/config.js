const request = require('supertest');
const app = require('./app');

describe('Session Cookie Test', () => {
  it('should not use the default session cookie name', async () => {
    const response = await request(app).get('/example');
    expect(response.headers['set-cookie']).not.toContain('connect.sid');
  });
});