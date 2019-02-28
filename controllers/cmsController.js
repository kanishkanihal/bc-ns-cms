const CMS = require("../models/cmsModel");

module.exports = {
  getAllCMSBlocks: async (req, res, next) => {
    const cmsBlocks = await CMS.findAll();
    console.log("cmsBlocks", cmsBlocks);
    res.status(200).json({
      cmsBlocks
    });
    // CMS.findAll()
    //   .then(cmsBlocks => {
    //     console.log("cmsBlocks", cmsBlocks);
    //     res.sendStatus(200);
    //   })
    //   .catch(err => console.log(err));
  },
  addCMSBlock: async (req, res, next) => {
    console.log("start");
    const cmsblock = await CMS.build({
      id,
      code,
      title,
      content,
      status
    });
    const asd = cmsblock.save();
    console.log("middle");
    console.log("cmsBlocks", asd);
    res.status(200).json({
      asd
    });
  }
};
