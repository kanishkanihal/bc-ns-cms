"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Sites", "site-info", Sequelize.STRING, {
      after: "store_hash" // after option is only supported by MySQL
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Sites", "site-info");
  }
};
