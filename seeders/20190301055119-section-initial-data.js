'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Sections', [{
        section: 'section1',
        createdAt:  new Date(),
        updatedAt : new Date(),
      },
      {
        section: 'section2',
        createdAt:  new Date(),
        updatedAt : new Date(),
      },
      {
        section: 'section3',
        createdAt:  new Date(),
        updatedAt : new Date(),
      },
      {
        section: 'section4',
        createdAt:  new Date(),
        updatedAt : new Date(),
      },
      {
        section: 'section5',
        createdAt:  new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sections', null, {});
  }
};
