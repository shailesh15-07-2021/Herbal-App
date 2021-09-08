const VendorDB = require("../../modules/vendorModel");
module.exports = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    VendorDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: `Vendor may not present with this ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error while retriving the Vendor" });
      });
  } else {
    VendorDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }
};
