/*
200 - Ok
301 - Resource Moved
404 - Not Found
500 - Internal Server Error
*/

const http = require("http");
//For reading files
const fs = require('fs');

const _ = require('lodash');

/*Runs every time a request comes in to the server
Req: Gives you inforrmation about the request
*/
const server = http.createServer((req, res) => {
    
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    })

    // Response headers
    res.setHeader('Content-Type', 'text/html');

    // Basic routing
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    // sending HTML file 
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {

            res.end(data);
        }
    })
});

// Listen for requests coming to our own computer
server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});

