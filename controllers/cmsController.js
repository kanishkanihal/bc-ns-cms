const db = require("../models/index");
const block = db.Block;
//var storehash = req.session.storehash;
module.exports = {
  findAll: async (req, res, next) => {
    var siteId = req.session.site_id;
    var result = await block.findAll({ where: { site_id: siteId } });
    res.json(result);
  },
  findById: async (req, res, next) => {
    var siteId = req.session.site_id;
    var result = await block.findAll({
      where: {
        id: req.params.id,
        site_id: siteId
      }
    });
    res.json(result);
  },
  create: async (req, res, next) => {
    var siteId = req.session.site_id;
    req.body.site_id = siteId;
    var result = await block.create(req.body);
    res.json(result);
  },
  update: async (req, res, next) => {
    var siteId = req.session.site_id;
    var result = await block.update(req.body, {
      where: {
        id: req.params.id,
        site_id: siteId
      }
    });
    res.json(result);
  },
  delete: async (req, res, next) => {
    var siteId = req.session.site_id;
    var result = await block.destroy({
      where: {
        id: req.body.id,
        site_id: siteId
      }
    });
    res.json(result);
  }
};
