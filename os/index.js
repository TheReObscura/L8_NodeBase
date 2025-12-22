const os = require('os');
require('dotenv').config();

function printOSInfo() {
    console.log("Основная информация об ОС");
    console.log("Платформа:", os.platform());
    console.log("Свободная память (GB):", (os.freemem() / 1024 / 1024 / 1024).toFixed(2));
    console.log("Домашняя директория:", os.homedir());
    console.log("Имя компьютера:", os.hostname());
    console.log("Сетевые интерфейсы:", os.networkInterfaces());
}

function checkMemory() {
    const freeGB = os.freemem() / 1024 / 1024 / 1024;
    if (freeGB > 4) {
        console.log("Свободной памяти больше 4GB:", freeGB.toFixed(2));
    } else {
        console.log("Свободной памяти меньше 4GB:", freeGB.toFixed(2));
    }
}

function runOSInfoByMode() {
    const mode = process.env.MODE || "user";
    if (mode === "admin") {
        printOSInfo();
    } else {
        console.log("Доступ запрещён для MODE =", mode);
    }
}

module.exports = {
    printOSInfo,
    checkMemory,
    runOSInfoByMode
};

runOSInfoByMode();
checkMemory();
