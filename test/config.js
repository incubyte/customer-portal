import request from 'supertest';
import app from './app';

describe('CSRF Middleware', () => {
  it('should include CSRF middleware', async () => {
    const response = await request(app).get('/example');
    expect(response.status).toBe(403);
    expect(response.text).toBe('Forbidden');
  });
});