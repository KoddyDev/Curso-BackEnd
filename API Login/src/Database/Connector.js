const { Sequelize } = require("sequelize")

module.exports = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: 'src/Database/Archive.sqlite'
  })