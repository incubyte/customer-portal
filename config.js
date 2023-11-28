'use strict';

const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSession = require('express-session');

app.use(helmet());
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, expires: new Date(Date.now() + 3600000), domain: 'your-domain.com' }
}));

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));