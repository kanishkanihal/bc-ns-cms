'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pages', [{
      page: 'all',
      createdAt:  new Date(),
      updatedAt : new Date(),
    },
    {
      page: 'category',
      createdAt:  new Date(),
      updatedAt : new Date(),
    },
    {
      page: 'product',
      createdAt:  new Date(),
      updatedAt : new Date(),
    },
    {
      page: 'page',
      createdAt:  new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pages', null, {});
  }
};
