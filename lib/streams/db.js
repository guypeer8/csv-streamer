const { MAX_FILE_SIZE } = require('../bin/config');
const { Transform } = require('stream');
const db = require('../utils/db');

let records = [], file_size = 0;

const breakCsvRow = row => row.replace(/\r\n/g, '').split(',');

function createRecords(header) {
    return new Transform({
        async transform(chunk, encoding, cbk) {
            const line = chunk.toString();
            const line_size = line.length;
            (file_size === 0) && (file_size += header.length);

            if (line_size > 0) {
                if (file_size > MAX_FILE_SIZE) {
                    file_size = header.length + line_size;
                    await db.create(records);
                    records = [];
                } else {
                    file_size += line_size;
                    records.push(createRecordObject(header, line));
                }
            }

            this.push(line);
            cbk();
        },
    });
}

function createRecordObject(header, record) {
    const recordObject = {};
    const _record = breakCsvRow(record);
    breakCsvRow(header).forEach((col, i) =>
        recordObject[col] = _record[i]
    );

    return recordObject;
}

module.exports = createRecords;
