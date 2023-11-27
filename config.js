'use strict';

const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSession = require('express-session');
const csurf = require('csurf');

app.use(helmet());
app.use(bodyParser.json());
app.use(expressSession());
app.use(csurf());

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));