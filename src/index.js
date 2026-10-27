const http = require('http');
const fs = require('fs');
const path = require('path');

function getUsers() {
    const filePath = path.join(__dirname, './data/users.json');
    return fs.readFileSync(filePath);
}

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.searchParams.size === 1) {
        if (url.searchParams.has('hello')) {
            const name = url.searchParams.get('hello');

            if (!name) {
                response.statusCode = 400;
                response.statusMessage = 'name is nessesary!';
                response.end('Enter a name');
            } else {
                response.statusCode = 200;
                response.statusMessage = 'ok';
                response.setHeader('Content-Type', 'text/plain');
                response.end(`Hello, ${name}.`);
            }
        } else if (url.searchParams.has('users')) {
            response.statusCode = 200;
            response.statusMessage = 'ok';
            response.setHeader('Content-Type', 'application/json');
            response.write(getUsers());
            response.end();
        } else {
            response.statusCode = 500;
            response.statusMessage = 'Unknown parameter!';
            response.end();
        }
    } else if (url.searchParams.size === 0) {
        response.statusCode = 200;
        response.statusMessage = 'ok';
        response.setHeader('Content-Type', 'text/plain');
        response.end(`Hello, world!`);
    } else {
        response.statusCode = 500;
        response.statusMessage = 'Unknown parameter!';
        response.end();
    }
});

server.listen(3003, () => {
    console.log('Сервер запущен на localhost: 3003');
});
