import request from 'supertest';
import app from './app';

describe('Session Middleware', () => {
  it('should set secure flag for session cookie', async () => {
    const response = await request(app).get('/example');
    const sessionCookie = response.headers['set-cookie'][0];

    expect(sessionCookie).toMatch(/Secure/);
  });
});