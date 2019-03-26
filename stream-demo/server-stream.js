const server = require('http').createServer();
const { createReadStream } = require('fs');

console.warn('process id: ', process.pid);

server.on('request', (req, res) =>
    createReadStream('./file.txt').pipe(res)
);

server.listen(8555);
