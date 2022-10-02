const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();

app.use(cors());

// const jsonParser  = express.json();


app.post('/',jsonParser,(req, res) => {
    console.log(req.body);
    // console.log(req);
    if(!req.body) return res.sendStatus(400);
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    
    res.send(`${req.body.name}:${req.body.phone}`);
});

const port = 8080;
const hostname = '127.0.0.1';
app.listen(8080, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


const requestListener = function (request, response) {
    console.log(request);
    // fs.readFile('/home/ki/Documents/projects/test/server/requireData.json', (err, data) => {
    //     response.setHeader('Content-Type', 'application/json');
    //     response.end(data);
    // })

}

// const server = http.createServer(requestListener);

// server.listen(port,hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });