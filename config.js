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
    name: 'my-session-cookie',
    secret: 'my-secret-key',
    cookie: {
        secure: true,
        domain: 'example.com' // Set the domain of the cookie to match the server's domain
    }
}));

app.get('/example', function(req, res) {
    res.end(`I'm in danger!`);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));