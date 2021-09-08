const ContactDB = require("../../modules/subCategoryModel");

module.exports = (req, res, next) => {
  const { email } = req.body;

  const contact = new ContactDB({ email });
  contact
    .save(contact)
    .then((data) => {
      res.status(201).json({
        msg: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating data",
      });
    });
};
