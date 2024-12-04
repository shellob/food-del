const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category_id: { type: DataTypes.INTEGER },
}, {
    tableName: 'Products',
    timestamps: false,
});

module.exports = Product;