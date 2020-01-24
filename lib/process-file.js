const { createGunzip } = require('zlib');
const { createReadStream } = require('fs');
const { createLineReader, createRecords, createHash, createCsv } = require('./streams');

const processFile = (header, file) => (
    new Promise(resolve => (
        createReadStream(file)
            .pipe(createGunzip())
            .pipe(createLineReader())
            .pipe(createHash())
            .pipe(createRecords(header))
            .pipe(createCsv(header))
            .on('finish', resolve)
            .on('error', resolve)
    ))
);

module.exports = processFile;
