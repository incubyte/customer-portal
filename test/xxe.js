import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import libxmljs from 'libxmljs';

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

describe('XXE Vulnerability Test', () => {
  it('should not be vulnerable to XXE attacks', (done) => {
    const maliciousXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE foo [
        <!ELEMENT foo ANY >
        <!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
      <name>&xxe;</name>
    `;

    request(app)
      .post('/xxe')
      .send(maliciousXml)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.not.contain('/etc/passwd');
        done();
      });
  });
});