const request = require('supertest');
const app = require('./app');

describe('CSRF Middleware', () => {
  it('should have CSRF middleware', async () => {
    const response = await request(app).get('/xss');
    expect(response.statusCode).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });
});