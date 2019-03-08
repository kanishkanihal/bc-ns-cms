"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("Clients", "storeHash", {
        type: Sequelize.STRING(64),
        allowNull: true
      })
      .then(() => {
        queryInterface.addColumn("Clients", "bcClientId", {
          type: Sequelize.STRING(64),
          allowNull: true
        });
      })
      .then(
        queryInterface.addColumn("Clients", "bcClientSecret", {
          type: Sequelize.STRING(64),
          allowNull: true
        })
      )
      .then(
        queryInterface.addColumn("Clients", "hashCode", {
          type: Sequelize.STRING(64),
          allowNull: false
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn("Clients", "bcUserId")
      .then(queryInterface.removeColumn("Clients", "bcClientId"))
      .then(queryInterface.removeColumn("Clients", "bcClientSecret"))
      .then(queryInterface.removeColumn("Clients", "hashCode"));
  }
};
