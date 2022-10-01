const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.post('/', urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    
    res.send(`${req.body.name}:${req.body.phone}`);
})

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