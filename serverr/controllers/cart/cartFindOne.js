const CartDB = require("../../modules/cartModel");
module.exports = (req, res) => {
  if (req.params.id) {
    CartDB.findById(req.params.id).populate("productObjectID")
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Product may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    CartDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
