const db = require("../models/index");
const block = db.Block;
module.exports = {
  findAll: async (req, res, next) => {
    var result = await block.findAll();
    res.json(result);
  },
  findById: async (req, res, next) => {
    var result = await block.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(result);
  },
  create: async (req, res, next) => {
    var result = await block.create(req.body);
    res.json(result);
  },
  update: async (req, res, next) => {
    var result = await block.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(result);
  },
  delete: async (req, res, next) => {
    var result = await block.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  }
};
