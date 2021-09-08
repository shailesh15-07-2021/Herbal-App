const ContactDB = require("../../modules/ContactUsModel");

module.exports = (req, res, next) => {
  const { name, email, contact, subject, message } = req.body;

  const contactUs = new ContactDB({ name, email, contact, subject, message });
  contactUs
    .save(contactUs)
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
