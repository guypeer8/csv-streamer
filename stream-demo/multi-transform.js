const { Transform: MultiTransform } = require('stream');

console.warn('say something I want to multiply you\n');

const breaker = new MultiTransform({
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        const [array, factor] = chunk
            .toString()
            .trim()
            .split(/\*/);

        this.push({
            factor: Number(factor || 1),
            array: array.split(',').map(i => i.trim()),
        });
        callback();
    },
});

const multiarray = new MultiTransform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        const { factor, array } = chunk;
        const multi = array.map(num => Number(num * factor));
        this.push('= ' + multi.toString() + '\n');
        callback();
    },
});

process.stdin
    .pipe(breaker)
    .pipe(multiarray)
    .pipe(process.stdout);
