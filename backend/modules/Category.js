const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
}, {
    tableName: 'Categories',
    timestamps: false,
});

module.exports = Category;