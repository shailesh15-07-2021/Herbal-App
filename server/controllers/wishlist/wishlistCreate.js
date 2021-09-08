const WishlistDB = require("../../modules/wishlistModel");

module.exports = (req, res, next) => {
  const { userObjectID, productObjectID, status } = req.body;

  const wishlist = new WishlistDB({
    userObjectID,
    productObjectID,
    status,
  });
  wishlist
    .save()
    .then((data) => {
      res.status(201).json({
        msg: "Added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating ",
      });
    });
};
