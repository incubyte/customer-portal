import { expect } from 'chai';
import request from 'supertest';
import express from 'express';

const app = express();

describe('Session Management', () => {
  it('should not have hard-coded session secret', () => {
    const sessionSecret = app._router.stack.find(
      (middleware) => middleware.name === 'session'
    ).secret;

    expect(sessionSecret).to.not.equal('secret');
  });
});