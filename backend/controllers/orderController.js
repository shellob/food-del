const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');


exports.createOrder = async(req, res) => {
    try {
        const { items, total } = req.body;
        const userId = req.user ? req.user.id : 1;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Список товаров пуст' });
        }

        console.log("userId:", userId);
        console.log("items:", items);

        // Создание заказа
        const newOrder = await Order.create({ total_price: total, user_id: userId, status: 'Создан' });

        await Promise.all(items.map(async(item) => {
            if (!item.productId || !item.quantity) {
                throw new Error('Продукт не содержит необходимых данных');
            }

            await OrderItem.create({
                order_id: newOrder.id,
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price || 0,
            });
        }));

        res.status(201).json({ message: 'Заказ успешно создан' });
    } catch (error) {
        console.error('Ошибка создания заказа:', error);
        res.status(500).json({ error: 'Ошибка создания заказа' });
    }
};
exports.getAllOrders = async(req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderById = async(req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: 'Заказ не найден' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async(req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: 'Заказ не найден' });
        await order.update(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteOrder = async(req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: 'Заказ не найден' });
        await order.destroy();
        res.status(200).json({ message: 'Заказ удален' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};