const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('Food_Del_DB', 'postgres', 'Notwerk2002', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize