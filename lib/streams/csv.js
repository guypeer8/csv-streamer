const writeStream = require('../utils/write-stream');
const { MAX_FILE_SIZE } = require('../bin/config');
const { Transform } = require('stream');

let file_size = 0;

const createLine = line => line + '\r\n';

function createCsv(header) {
    return new Transform({
        transform(chunk, encoding, cbk) {
            let _write = '';
            const line = chunk.toString();
            const line_size = line.length;

            if (file_size === 0) {
                file_size += header.length;
                _write += createLine(header);
            }

            if (line_size > 0) {
                if (file_size >= MAX_FILE_SIZE) {
                    writeStream.create();
                    file_size = header.length + line_size;
                    _write += createLine(header);
                } else {
                    file_size += line_size;
                }

                _write += createLine(line);
            }

            if (_write.length > 0)
                writeStream.get().write(_write);

            cbk();
        },
    });
}

module.exports = createCsv;
