require('dotenv').config();

const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME || 'Food_Del_DB',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD ||'123',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || "5432",
        dialect: "postgres",
    }
);

module.exports = sequelize;