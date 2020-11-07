const {
    DB, dialect, HOST, PASSWORD, pool, USER
} = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    operatorsAliases: false,
    pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require('./tutorial.model')(sequelize);

module.exports = db;
