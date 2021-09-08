const WishlistDB = require("../../modules/wishlistModel");

module.exports = (req, res) => {
  if (req.query.id) {
  
    WishlistDB.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: ` may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the data" });
      });
  } else {
    WishlistDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
