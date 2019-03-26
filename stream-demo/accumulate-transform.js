const { Transform } = require('stream');

console.warn('say something I want to add you\n');

let num = 0;

const adder = new Transform({
    transform(chunk, encoding, callback) {
        num += Number(chunk.toString().trim());
        this.push('= ' + num.toString() + '\n');
        callback();
    },
});

process.stdin.pipe(adder).pipe(process.stdout);
