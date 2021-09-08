const OrderDB = require("../../modules/OrderModel");
module.exports = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    OrderDB.findById(id)
      .populate("vendorObjectID")
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Order  may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    OrderDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
