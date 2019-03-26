const { Transform } = require('stream');

function createLineReader(type = 'body') {
    return new Transform({
        transform(chunk, encoding, cbk) {
            let lines = chunk
                .toString()
                .split(/\r\n/g)
                .filter(line => !!line);

            if (type === 'header') {
                this.push(lines[0]);
            } else {
                const _lines = lines.slice(1);
                while (_lines.length > 0)
                    this.push(_lines.shift());
            }

            cbk();
        },
    });
}

module.exports = createLineReader;
