const Category = require("../../modules/categoryModel");

module.exports = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Category.findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Category may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    Category.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
