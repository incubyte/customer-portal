import request from 'supertest';
import app from './app';

describe('Session Middleware', () => {
  it('should set the httpOnly flag for session cookies', async () => {
    const response = await request(app).get('/example');
    const setCookieHeader = response.headers['set-cookie'];

    expect(setCookieHeader).toBeDefined();
    expect(setCookieHeader).toContain('HttpOnly');
  });
});