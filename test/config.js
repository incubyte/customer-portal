import request from 'supertest';
import app from './app';

describe('Security Test', () => {
  it('should not set secure and httpOnly cookies', async () => {
    const response = await request(app).get('/example');
    expect(response.headers['set-cookie']).not.toContain('secure');
    expect(response.headers['set-cookie']).not.toContain('httpOnly');
  });
});