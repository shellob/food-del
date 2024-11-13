const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('Food_Del_DB', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize