const CartDB = require("../../modules/cartModel");

module.exports = (req, res, next) => {
  CartDB.findByIdAndUpdate(
    req.body._id,
    { qty: req.body.qty },
    { upsert: true, new: true }
  )
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding data of particular id" });
      } else {
        res.status(200).json({
          msg: "Data Updated successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Category update information" });
    });
};
