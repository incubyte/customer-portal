'use strict';

const port = 3000;
const express = require('express');
const keys = require('node-serialize');
const csrf = require('csurf'); // Added CSRF middleware
const app = express();

app.use(express.text({type: 'text/plain'}));

// Added CSRF middleware
app.use(csrf());

app.post('/keys', function(req, res) {
    const unserialized = keys.unserialize(req.body);
    res.end('keys are ' + Object.keys(unserialized));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));