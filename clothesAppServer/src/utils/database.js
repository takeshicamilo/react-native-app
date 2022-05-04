const Sequelize = require('sequelize');

const sequelize = new Sequelize('clothesApp', 'xd', 'hola', {
    dialect: 'mysql',
    host: 'localhost', 
});
module.exports = sequelize;

