const Sequelize = require("sequelize");
const db = require("../config/databaseConfig");

const CMSBlock = db.define("cmsblock", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports = CMSBlock;
