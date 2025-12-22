const fs = require('fs').promises;
const path = require('path');

async function writeFile(filePath, content) {
    await fs.writeFile(filePath, content, 'utf8');
}

async function readFile(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch {
        return null;
    }
}

async function overwriteFile(filePath, content) {
    await fs.writeFile(filePath, content, 'utf8');
}

async function clearFile(filePath) {
    await fs.writeFile(filePath, '', 'utf8');
}

async function cleanFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        content = content.replace(/[0-9]/g, '').toLowerCase();
        await fs.writeFile(filePath, content, 'utf8');
    } catch {}
}

async function copyFile(srcPath, destPath) {
    try {
        await fs.copyFile(srcPath, destPath);
    } catch {}
}

async function createFolder(folderPath) {
    try {
        await fs.mkdir(folderPath, { recursive: true });
    } catch {}
}

async function deleteFolder(folderPath) {
    try {
        await fs.rm(folderPath, { recursive: true, force: true });
    } catch {}
}

async function listAllFiles(dirPath) {
    let results = [];
    const files = await fs.readdir(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            const nested = await listAllFiles(fullPath);
            results = results.concat(nested);
        } else if (!['.git', 'node_modules'].some(ex => fullPath.includes(ex))) {
            results.push(fullPath);
        }
    }
    return results;
}

async function clearProject(dirPath) {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
        if (['.git', 'node_modules'].includes(file)) continue;
        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            await fs.rm(fullPath, { recursive: true, force: true });
        } else {
            await fs.unlink(fullPath);
        }
    }
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
