module.exports = {
  getAllCMSBlocks: async (req, res, next) => {
    res.status(200).json({
      data: {
        message: "All CMS Block"
      }
    });
  }
};
