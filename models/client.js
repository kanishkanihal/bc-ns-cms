"use strict";
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      email: DataTypes.STRING,
      storeHash: DataTypes.STRING,
      bcClientId: DataTypes.STRING,
      bcClientSecret: DataTypes.STRING,
      hashCode: DataTypes.STRING
    },
    {}
  );
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};
