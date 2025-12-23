const sortStrings = require('./modules/sortStrings');
const loadData = require('./modules/loadData');
const fsModule = require('./modules/fsModule');

(async () => {
    const { data } = await loadData('https://jsonplaceholder.typicode.com/users');

    const names = data.map(u => u.name);
    const emails = data.map(u => u.email);

    const sortedNames = sortStrings(names);

    fsModule.createFolder('users');
    fsModule.writeFile('users/names.txt', sortedNames.join('\n'));
    fsModule.writeFile('users/emails.txt', emails.join('\n'));
})();