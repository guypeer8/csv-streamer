const createLineReader = require('../streams/line-reader');
const { CSV_GZIP_DIR } = require('../bin/config');
const asyncFilter = require('filter-async');
const { createGunzip } = require('zlib');
const { join } = require('path');
const fs = require('fs');

function getCsvFiles(dir = CSV_GZIP_DIR) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, { encoding: 'utf-8' }, (err, files) => {
            if (err) return reject(err);

            const gzipFiles = files
                .filter(file => file.includes('.csv.gz'))
                .map(file => join(dir, file));

            asyncFilter(
                gzipFiles,
                (file, cbk) => {
                    fs.stat(file, (err, stats) =>
                        err ? cbk(err) : cbk(null, stats.isFile())
                    )
                },
                (err, files) =>
                    err ? reject(err) : resolve(files)
            );
        });
    });
}

function getCsvHeader(file) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(createGunzip())
            .pipe(createLineReader('header'))
            .on('data', chunk => resolve(chunk.toString()))
            .on('error', err => reject(err));
    });
}

module.exports = {
    getCsvFiles,
    getCsvHeader,
};
