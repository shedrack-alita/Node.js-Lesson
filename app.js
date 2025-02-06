const http = require('http');
const port = 5000;
const host = 'localhost';


// Create a server
const system = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Welcome to my first Node.js website!');
});

// Start the server
system.listen(port, host, () => {
    console.log(`System is running at http://${host}:${port}/`);
});
