const server = require('http').createServer();
const { readFileSync } = require('fs');

console.warn('process id: ', process.pid);

server.on('request', (req, res) => {
    const content = readFileSync('./file.txt');
    res.end(content);
});

server.listen(8555);
