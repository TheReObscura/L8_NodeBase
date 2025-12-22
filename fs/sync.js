const fs = require('fs');
const path = require('path');

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
    }
    return null;
}

function overwriteFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

function clearFile(filePath) {
    fs.writeFileSync(filePath, '', 'utf8');
}

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/[0-9]/g, '').toLowerCase();
    fs.writeFileSync(filePath, content, 'utf8');
}

function copyFile(srcPath, destPath) {
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
    }
}

function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
    }
}

function listAllFiles(dirPath) {
    let results = [];
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(listAllFiles(fullPath));
        } else if (!['.git', 'node_modules'].some(ex => fullPath.includes(ex))) {
            results.push(fullPath);
        }
    });
    return results;
}

function clearProject(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (['.git', 'node_modules'].includes(file)) return;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
            fs.unlinkSync(fullPath);
        }
    });
}

module.exports = {
    writeFile,
    readFile,
    overwriteFile,
    clearFile,
    cleanFile,
    copyFile,
    createFolder,
    deleteFolder,
    listAllFiles,
    clearProject
};
