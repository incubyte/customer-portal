import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import libxmljs from 'libxmljs';

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

describe('XXE Attack Test', () => {
  it('should prevent XXE attack', (done) => {
    const maliciousXml = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><name>&xxe;</name>';
    
    request(app)
      .post('/xxe')
      .send(maliciousXml)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Name is: ');
        done();
      });
  });
});