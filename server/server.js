const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.post('/',jsonParser,(req, res) => {
    console.log(req.body);
    if(!req.body) return res.sendStatus(400);
 
    res.send(`${req.body.name}:${req.body.phone}`);
});

const port = 8080;
const hostname = '127.0.0.1';
app.listen(8080, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


