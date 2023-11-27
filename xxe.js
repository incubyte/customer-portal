'use strict';

const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const libxmljs = require('libxmljs');

app.use(bodyParser.text({type: '*/*'}));
app.post('/xxe', function(req, res) {
    const parsed = libxmljs.parseXml(req.body, {noent: false}); // Set `noent` field to `false` to prevent XML External Entities (XXE) attack
    const name = parsed.get('//name').text();
    res.end('Name is: ' + name);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));