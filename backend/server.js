const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, '../public')));

// Простая база данных заказов в памяти
let orders = {};

// Маршрут для создания нового заказа (POST /order)
app.post('/order', (req, res) => {
    const { orderId, items } = req.body;
    if (!orderId || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Неверные данные заказа' });
    }
    orders[orderId] = { items, status: 'Принят', history: ['Принят'] };
    res.json({ message: 'Заказ принят', orderId, status: orders[orderId].status });
});

// Маршрут для получения информации о заказе (GET /order/:orderId)
app.get('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    if (!orders[orderId]) {
        return res.status(404).json({ error: 'Заказ не найден' });
    }
    res.json({ orderId, items: orders[orderId].items, status: orders[orderId].status, history: orders[orderId].history });
});

// Маршрут для получения всех заказов (GET /orders)
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Маршрут для фильтрации заказов по статусу (GET /orders/filter?status=)
app.get('/orders/filter', (req, res) => {
    const { status } = req.query;
    if (!status) {
        return res.status(400).json({ error: 'Параметр статуса не указан' });
    }

    // Фильтрация заказов по статусу
    const filteredOrders = Object.keys(orders).reduce((result, orderId) => {
        if (orders[orderId].status === status) {
            result[orderId] = orders[orderId];
        }
        return result;
    }, {});

    if (Object.keys(filteredOrders).length === 0) {
        return res.status(404).json({ message: 'Заказы с таким статусом не найдены' });
    }

    res.json(filteredOrders);
});

// Маршрут для обновления состояния заказа (PUT /order/:orderId/status)
app.put('/order/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orders[orderId]) {
        return res.status(404).json({ error: 'Заказ не найден' });
    }

    // Обновляем статус заказа и добавляем в историю
    orders[orderId].status = status;
    orders[orderId].history.push(status);
    res.json({ message: 'Статус заказа обновлен', orderId, status: orders[orderId].status, history: orders[orderId].history });
});

// Маршрут для обновления статуса нескольких заказов (PUT /orders/status)
app.put('/orders/status', (req, res) => {
    const { orderIds, status } = req.body;
    if (!Array.isArray(orderIds) || !status) {
        return res.status(400).json({ error: 'Неверные данные для обновления заказов' });
    }

    // Обновляем статус для каждого заказа
    const updatedOrders = orderIds.reduce((result, orderId) => {
        if (orders[orderId]) {
            orders[orderId].status = status;
            orders[orderId].history.push(status);
            result.push({ orderId, status: orders[orderId].status, history: orders[orderId].history });
        }
        return result;
    }, []);

    if (updatedOrders.length === 0) {
        return res.status(404).json({ message: 'Ни один заказ не был обновлен' });
    }

    res.json({ message: 'Статусы заказов обновлены', orders: updatedOrders });
});

// Маршрут для поиска заказов по названию товара (GET /orders/search?item=)
app.get('/orders/search', (req, res) => {
    const { item } = req.query;
    if (!item) {
        return res.status(400).json({ error: 'Параметр товара не указан' });
    }

    // Поиск заказов, которые содержат указанный товар
    const foundOrders = Object.keys(orders).reduce((result, orderId) => {
        const orderItems = orders[orderId].items;
        if (orderItems.includes(item)) {
            result[orderId] = orders[orderId];
        }
        return result;
    }, {});

    if (Object.keys(foundOrders).length === 0) {
        return res.status(404).json({ message: 'Заказы с таким товаром не найдены' });
    }

    res.json(foundOrders);
});

// Маршрут для обновления элементов заказа (PUT /order/:orderId/items)
app.put('/order/:orderId/items', (req, res) => {
    const { orderId } = req.params;
    const { items } = req.body;
    if (!orders[orderId]) {
        return res.status(404).json({ error: 'Заказ не найден' });
    }
    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Неверные данные для обновления элементов' });
    }
    orders[orderId].items = items;
    res.json({ message: 'Товары в заказе обновлены', orderId, items: orders[orderId].items });
});

// Маршрут для удаления заказа (DELETE /order/:orderId)
app.delete('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    if (!orders[orderId]) {
        return res.status(404).json({ error: 'Заказ не найден' });
    }
    delete orders[orderId];
    res.json({ message: 'Заказ удален', orderId });
});

// Маршрут для удаления всех заказов (DELETE /orders)
app.delete('/orders', (req, res) => {
    orders = {};
    res.json({ message: 'Все заказы удалены' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});