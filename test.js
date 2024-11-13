const fs = require('fs');
const crypto = require('crypto');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
  } else {
    console.log('Содержимое файла прочитано, начинаем обработку...');
    // Синхронная операция: например, сложное вычисление
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const result = hash.digest('hex');
    console.log('Результат хеширования:', result);
  }
});