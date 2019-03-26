const appRoot = require('app-root-dir').get();
const readline = require('readline');
const { writeFile } = require('fs');
const { join } = require('path');
const db = require('./utils/db');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function postProcess() {
    console.log('finished creating csv files & writing to db!');
    const question = 'Would you like to log the db data? (Y / N)\n';

    rl.question(question, async answer => {
        const _answer = answer && answer.toLocaleLowerCase().trim();
        if (_answer !== 'y' && _answer !== 'yes')
            return rl.close();

        const apps = await db.read();
        const jsonPath = join(appRoot, 'data.json');

        writeFile(jsonPath, apps, err => {
            console.warn(err || apps);
            rl.close();
        });
    });
}

module.exports = postProcess;
