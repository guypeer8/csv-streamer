const { createHash } = require('crypto');
const { Transform } = require('stream');

const hash = {};

function createMD5(hash = {}) {
    return new Transform({
        transform(chunk, encoding, cbk) {
            const data = chunk.toString();
            const md5 = createHash('md5').update(data).digest('hex');

            if (hash[md5]) {
                this.push('');
            } else {
                hash[md5] = 1;
                this.push(data);
            }

            cbk();
        },
    });
}

module.exports = createMD5;
