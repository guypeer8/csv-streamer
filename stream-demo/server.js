const server = require('http').createServer();
const { readFileSync } = require('fs');

console.warn('process id: ', process.pid);

server.on('request', (req, res) => res.end(readFileSync('./file.txt')));

server.listen(8555);
