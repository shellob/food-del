const Category = require('../models/Category');

exports.createCategory = async(req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllCategories = async(req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async(req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Категория не найдена' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async(req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Категория не найдена' });
        await category.update(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Категория не найдена' });
        await category.destroy();
        res.status(200).json({ message: 'Категория удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};