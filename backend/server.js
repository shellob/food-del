const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/config');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
// Middleware для обработки JSON
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderItemRoutes);

// Подключение к базе данных и синхронизация моделей
sequelize.authenticate()
    .then(() => console.log('Соединение с базой данных установлено.'))
    .then(() => sequelize.sync())
    .catch(err => console.error('Ошибка соединения с базой данных:', err));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});