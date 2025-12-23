const fs = require('fs');
const path = require('path');

function createFolder(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
    createFolder,
    writeFile
};