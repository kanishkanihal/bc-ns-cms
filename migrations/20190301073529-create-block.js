"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    //console.log(queryInterface.sequelize);
    return queryInterface.createTable("Blocks", {
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
      page_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pages"
        }
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sections"
        }
      },
      code: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Blocks");
  }
};
