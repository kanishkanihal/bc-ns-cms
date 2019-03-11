"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    //Create site table
    return queryInterface
      .createTable("Sites", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        client_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Clients"
          }
        },
        store_hash: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        //Delete Client ID from the Block
        return queryInterface.removeColumn("Blocks", "client_id").then(() => {
          //Add Column
          return queryInterface
            .addColumn("Blocks", "site_id", Sequelize.INTEGER)
            .then(() => {
              queryInterface.addConstraint("Blocks", ["site_id"], {
                type: "foreign key",
                name: "Blocks_ibfk_1",
                references: {
                  //Required field
                  table: "Sites",
                  field: "id"
                }
              });
            });
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Sites");
  }
};
