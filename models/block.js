'use strict';
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Block.associate = function(models) {
    Block.belongsTo(models.Client,{
      foreignKey: 'client_id'
    });
    Block.belongsTo(models.Page,{
      foreignKey: 'page_id'
    });
    Block.belongsTo(models.Section,{
      foreignKey: 'section_id'
    });
  };
  return Block;
};