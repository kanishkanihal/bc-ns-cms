const db = require('../models/index')
const pages = db.page
module.exports = {
  findAll: async (req, res, next) => {
    console.log(db.Client.findAll())
    res.json({'s':'d'})
  },
  findById: async (req, res, next) => {
    res.send({'d':'id'})
  },
  create: async(req, res, next)=>{
    res.send({'d':'create'})
  },
  update: async(req, res, next)=>{
    res.send({'d':'update'})
  },
  delete: async(req, res, next)=>{
    res.send({'d':'delete'})
  }
};