const { Transform } = require('stream');

console.warn('say something I\'m uppercasing you\n');

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

process.stdin.pipe(uppercase).pipe(process.stdout);
