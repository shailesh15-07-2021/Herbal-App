const VendorDB = require("../../modules/vendorModel");

module.exports = (req, res) => {
  const id = req.params.id;

  VendorDB
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
        message: "Could not delete Vendor with id=" + id,
      });
    });
};
