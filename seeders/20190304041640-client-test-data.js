"use strict";

const crypto = require("crypto");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Clients",
      [
        {
          id: 1,
          email: "jhon.doe@netstarter.com",
          hashCode: crypto.randomBytes(32).toString("hex"),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clients", null, {});
  }
};
