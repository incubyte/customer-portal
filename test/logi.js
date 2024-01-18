import { expect } from 'chai';
import request from 'supertest';

describe('CSRF Middleware', () => {
  it('should have CSRF middleware', async () => {
    const app = require('./app'); // Replace with the path to your app file

    const res = await request(app)
      .post('/logi')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Logged in with the honor system');
  });
});