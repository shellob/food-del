// controllers/cartController.js
const Cart = new Map(); // Временное хранилище корзин на сервере

exports.saveCart = async (req, res) => {
    const userId = req.body.userId || 'guest'; // Используем userId, если есть, иначе 'guest'
    const { cartItems } = req.body;

    if (!cartItems) {
        return res.status(400).json({ error: 'Корзина пуста' });
    }

    Cart.set(userId, cartItems); // Сохраняем корзину для пользователя
    res.status(200).json({ message: 'Корзина сохранена' });
};

exports.getCart = async (req, res) => {
    const userId = req.query.userId || 'guest'; // Используем userId, если есть, иначе 'guest'
    const cartItems = Cart.get(userId);

    if (!cartItems) {
        return res.status(404).json({ error: 'Корзина не найдена' });
    }

    res.status(200).json(cartItems);
};
