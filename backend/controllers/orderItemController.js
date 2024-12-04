const OrderItem = require('../models/OrderItem');

exports.createOrderItem = async(req, res) => {
    try {
        const orderItem = await OrderItem.create(req.body);
        res.status(201).json(orderItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllOrderItems = async(req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderItemById = async(req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).json({ error: 'Позиция заказа не найдена' });
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrderItem = async(req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).json({ error: 'Позиция заказа не найдена' });
        await orderItem.update(req.body);
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteOrderItem = async(req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).json({ error: 'Позиция заказа не найдена' });
        await orderItem.destroy();
        res.status(200).json({ message: 'Позиция заказа удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};