const Sequelize = require('sequelize');

const sequelize = Sequelize("node-complete", "root", "sasa42+", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;