import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

describe('CSRF Middleware', () => {
  it('should have CSRF middleware', async () => {
    const res = await request(app)
      .post('/logi')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.status).to.equal(403);
    expect(res.text).to.equal('CSRF token missing or incorrect');
  });
});