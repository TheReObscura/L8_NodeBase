require('dotenv').config(); 
console.log("Текущий режим работы:", process.env.MODE);
console.log("Имя:", process.env.NAME);
console.log("Фамилия:", process.env.SURNAME);
console.log("Группа:", process.env.GROUP);
console.log("Номер по списку:", process.env.NUMBER);
const bcrypt = require('bcrypt');

const passwords = Array.from({ length: 13 }, (_, i) => `password${i + 1}`);
const saltRounds = 10;

(async () => {
  for (const pass of passwords) {
    const start = Date.now();
    await bcrypt.hash(pass, saltRounds);
    const end = Date.now();
    console.log(`${pass}: ${end - start} мс`);
  }

  console.log('\nbcrypt намеренно медленный алгоритм.');
  console.log('Время зависит от сложности хэша и нагрузки на процессор.');
  console.log('Режим работы:', process.env.MODE);
})();
