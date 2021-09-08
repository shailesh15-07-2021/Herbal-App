const SubCategory = require("../../modules/subCategoryModel");

module.exports = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    SubCategory.find()
      .limit(8)
      .exec()
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Sub category may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    SubCategory.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
