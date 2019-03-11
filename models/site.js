"use strict";
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    "Site",
    {
      store_hash: DataTypes.STRING
    },
    {}
  );
  Site.associate = function(models) {
    Site.belongsTo(models.Client, {
      foreignKey: "client_id"
    });
  };
  return Site;
};
