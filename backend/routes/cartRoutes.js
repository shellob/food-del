// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Сохранение корзины
router.post('/cart', cartController.saveCart);

// Получение корзины
router.get('/cart', cartController.getCart);

module.exports = router;
