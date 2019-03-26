const { CSV_DIR } = require('../bin/config');
const { createWriteStream } = require('fs');
const { join } = require('path');

let file_count = 0, ws;

const writeStream = {
    get: () => ws,
    create: () => {
        ws && ws.end();
        ws = createWriteStream(join(CSV_DIR, `${++file_count}.csv`));
    },
};

writeStream.create();

module.exports = writeStream;
