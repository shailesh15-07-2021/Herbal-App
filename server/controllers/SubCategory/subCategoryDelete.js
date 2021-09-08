const SubCategory = require("../../modules/subCategoryModel");

module.exports = (req, res) => {
  const id = req.params.id;

  SubCategory
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.redirect("back");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sub Category with id=" + id,
      });
    });
};
