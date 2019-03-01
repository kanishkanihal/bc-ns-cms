'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    page: DataTypes.STRING
  }, {});
  Page.associate = function(models) {
    // associations can be defined here
  };
  return Page;
};