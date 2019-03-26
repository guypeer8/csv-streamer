const appRoot = require('app-root-dir').get();
const { join } = require('path');

module.exports = {
    DB_STORAGE: join(appRoot, 'database.sqlite'),
    CSV_GZIP_DIR: join(appRoot, 'gzip'),
    CSV_DIR: join(appRoot, 'csv'),
    MAX_FILE_SIZE: 1024,
};
