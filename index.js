const { getCsvFiles, getCsvHeader } = require('./lib/utils/csv');
const processFile = require('./lib/process-file');
const postProcess = require('./lib/post-process');
const db = require('./lib/utils/db');

async function writeCsvFiles() {
    try {
        const files = await getCsvFiles();
        const header = await getCsvHeader(files[0]);

        db.start(header);

        for (let file of files) {
            await processFile(header, file);
        }

        postProcess();
    } catch(err) {
        console.warn(err);
    }
}

writeCsvFiles();
