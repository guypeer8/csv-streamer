const fs = require('fs');
const writeStream = fs.createWriteStream('./file.txt');

const times = !isNaN(process.argv[2]) ? process.argv[2] : 1;

writeStream.on('finish', () => {
    const megabytes = `${fs.statSync('./file.txt').size / 1e6} MB`;
    console.log(megabytes);
});

for (let i = 0; i < times * 1e6; i++) {
    writeStream.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}

writeStream.end();
